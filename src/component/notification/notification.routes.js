const router = require("express").Router()
const { protectedRoutes, allowedTo } = require("../auth/authentcation")
const { getPatientNotifications, getNurseNotifications, deleteAllPatientNotifications, deleteAllNurseNotifications, deleteOneNurseNotification, deleteOnePatientNotification } = require("./notification.service")

//patient notifications
router.get(
    '/patient'
    , protectedRoutes,
    allowedTo("patient"),
    getPatientNotifications
)
router.delete(
    "/patient/deleteAll",
    protectedRoutes,
    allowedTo("patient"),
    deleteAllPatientNotifications
)
router.delete(
    "/patient/delete/:id",
    protectedRoutes,
    allowedTo("patient"),
    deleteOnePatientNotification
)

// nurse notifications
router.get(
    '/nurse',
    protectedRoutes,
    allowedTo("nurse"),
    getNurseNotifications
)

router.delete(
    "/nurse/deleteAll",
    protectedRoutes,
    allowedTo("nurse"),
    deleteAllNurseNotifications
)
router.delete(
    "/nurse/delete/:id",
    protectedRoutes,
    allowedTo("nurse"),
    deleteOneNurseNotification
)

module.exports = router