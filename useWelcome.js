import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { formatConfig } from '@/helpers/dates/timezoneConfig'
import { setLocation } from '@/routes/guards'
import { WELCOME_LOCATION } from '@/constants/locations'
import { createChatbot, destroyChatbot } from '@/redux/reducers/chatbotReducer'
import { loadAllStudentEnrolments } from '@/redux/thunks/courseThunks'
import { studentEggAttendance } from '@/redux/thunks/student/welcome'
import { getAllCourses } from '@/redux/selectors/course'
import { getLoggedUser } from '@/redux/selectors/user'
import { updatePersonalInfo } from '@/redux/reducers/_deprecated/authReducer'
import nextOnSite from '../helpers/nextOnSiteLesson'
import { allowApiLessons } from '@/helpers/granters/courseTypeRules'

import {
    loadSurveyCourseUser,
    returnToWelcomeAction,
} from '../../../../redux/reducers/_deprecated/surveyReducer'

const noop = () => {}

const CONFIRM_MODAL_STATE = {
    show: false,
    confirmTitle: '',
    cancelTitle: '',
    body: '',
    onConfirm: noop,
}

export const useWelcome = () => {
    const dispatch = useDispatch()

    const user = useSelector(getLoggedUser)
    const courses = useSelector(getAllCourses)

    const [confirmModal, setConfirmModal] = useState(CONFIRM_MODAL_STATE)

    const { isMobile, showGreeting, mustChangePassword } = useSelector(
        ({ authReducer: { isMobile, showGreeting, user } }) => ({
            isMobile,
            showGreeting,
            mustChangePassword: user.mustChangePassword,
        })
    )

    const loading = useSelector(({ loading }) => loading.course)
    const lang = useSelector(({ langStore }) => ({
        welcome: langStore.welcomeScreen,
        greeting: langStore.greeting,
    }))

    const updateUserPersonalInfo = (data) => dispatch(updatePersonalInfo(data))

    const startedCoursesWithNextLessons = () =>
        courses.length &&
        courses.reduce((total, { lesson, CourseType }) => {
            const allowApiLessonsRule = allowApiLessons(CourseType)
            return total + (!!lesson.nextOnSite && allowApiLessonsRule)
        }, 0)

    const [courseId, nextOnSiteCourseName, nextOnSiteDate, showCompleteDate, onSiteLessonLink] =
        startedCoursesWithNextLessons() ? nextOnSite(courses) : [null, '', '']

    useEffect(() => {
        setLocation(WELCOME_LOCATION)
        dispatch(loadSurveyCourseUser())
        dispatch(returnToWelcomeAction())
        dispatch(loadAllStudentEnrolments()).then(() => dispatch(createChatbot()))

        return () => dispatch(destroyChatbot())
    }, [dispatch])

    const starredCourses = useMemo(
        () => courses.filter((course) => course.starred_date),
        [dispatch, courses, loading.setStarredCourse]
    )

    const onGoingCourses = useMemo(
        () => courses.filter((course) => !course.finished),
        [dispatch, courses, loading.setStarredCourse]
    )

    const finishedCourses = useMemo(
        () => courses.filter((course) => course.finished),
        [dispatch, courses, loading.setStarredCourse]
    )

    const hasFinishedCourses = !!courses.filter((course) => course.finished).length

    const hasEnrolments = !!courses.filter((course) => !course.finished).length

    const isOnSiteLessonStarted = () => new Date(nextOnSiteDate) <= new Date(moment().format())

    const formatedDate = () => {
        const hourFormat = nextOnSiteDate.split(':')[1] === '00' ? 'kk' : 'kk:mm'
        return formatConfig(
            nextOnSiteDate,
            'ddd DD/MM',
            ` [a las] ${hourFormat}[hs]`,
            showCompleteDate
        )
    }

    const goToLiveClass = () => {
        dispatch(studentEggAttendance(user.id, courseId))
        window.open(onSiteLessonLink, '_blank')
    }
    return {
        confirmModal,
        finishedCourses,
        hasEnrolments,
        hasFinishedCourses,
        isMobile,
        lang,
        loading,
        mustChangePassword,
        onGoingCourses,
        setConfirmModal,
        showGreeting,
        starredCourses,
        startedCoursesWithNextLessons,
        updateUserPersonalInfo,
        isOnSiteLessonStarted,
        nextOnSiteCourseName,
        formatedDate,
        user,
        onSiteLessonLink,
        goToLiveClass,
    }
}
