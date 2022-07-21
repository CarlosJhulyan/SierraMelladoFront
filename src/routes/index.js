import React, {lazy, useContext} from "react";
import {Redirect, Route, Switch, useLocation} from "react-router-dom";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import MainDashboard from "../components/layout/MainDashboard";
import {MyContext} from "../context/AuthContext";
import MainLanding from "../components/layout/MainLanding";

function Routes() {
  const {
    authAdmin,
    authPatient,
    authDoctor
  } = useContext(MyContext);

  const { pathname } = useLocation();

  const HomePage = lazy(() => import("../pages/HomePage"));
  const AboutUsPage = lazy(() => import("../pages/AboutUsPage"));
  const ContactPage = lazy(() => import("../pages/ContactPage"));
  const ClaimsPage = lazy(() => import("../pages/ClaimsPage"));
  const GalleryPage = lazy(() => import("../pages/GalleryPage"));
  const ServicesPage = lazy(() => import("../pages/ServicesPage"));

  const WorkersPageAdmin = lazy(() => import("../pages/admin/WorkersPage"));
  const DashboardPageAdmin = lazy(() => import("../pages/admin/DashboardPage"));
  const MessagesPageAdmin = lazy(() => import("../pages/admin/MessagesPage"));
  const OfficePageAdmin = lazy(() => import("../pages/admin/OfficesPage"));
  const DatePageAdmin = lazy(() => import("../pages/admin/DatesPage"));
  const SchedulesPageAdmin = lazy(() => import("../pages/admin/SchedulesPage"));
  const SignInPageAdmin = lazy(() => import("../pages/admin/SignInPage"));
  const ProfilePageAdmin = lazy(() => import("../pages/admin/ProfilePage"));
  const ArticlesPageAdmin = lazy(() => import("../pages/admin/ArticlesPage"));
  const ServicesPageAdmin = lazy(() => import("../pages/admin/ServicesPage"));

  const SignInPagePatient = lazy(() => import("../pages/patient/SignInPage"));
  const SignUpPagePatient = lazy(() => import("../pages/patient/SignUpPage"));
  const DashboardPagePatient = lazy(() => import("../pages/patient/DashboardPage"));
  const ProfilePagePatient = lazy(() => import("../pages/patient/ProfilePage"));
  const SurgeriesPagePatient = lazy(() => import("../pages/patient/SchedulesDoctorsPage"));
  const TrackingPagePatient = lazy(() => import("../pages/patient/TrackingDatesPage"));
  const DatesPagePatient = lazy(() => import("../pages/patient/DatesPage"));

  const SignInPageDoctor = lazy(() => import("../pages/doctor/SignInPage"));
  const DashboardPageDoctor = lazy(() => import("../pages/doctor/DashboardPage"));
  const ProfilePageDoctor = lazy(() => import("../pages/doctor/ProfilePage"));
  const SchedulesPageDoctor = lazy(() => import("../pages/doctor/SchedulesPage"));
  const ReportsPageDoctor = lazy(() => import("../pages/doctor/ReportsPage"));
  const DatesPageDoctor = lazy(() => import("../pages/doctor/DatesPage"));

  const isAdminPage = pathname.includes('/admin/');
  const isPatientPage = pathname.includes('/paciente/');
  const isDoctorPage = pathname.includes('/medico/');

  return (
    <Switch>
      <Route path="/ingreso" exact component={SignUp} />
      <Route path="/registro" exact component={SignIn} />

      {isAdminPage && (
        <>
          {authAdmin ? (
            <>
              <MainDashboard>
                <Route exact path="/admin/tablero" component={DashboardPageAdmin} />
                <Route exact path="/admin/trabajadores" component={WorkersPageAdmin} />
                <Route exact path="/admin/buzon-mensajes" component={MessagesPageAdmin} />
                <Route exact path="/admin/horarios" component={SchedulesPageAdmin} />
                <Route exact path="/admin/oficinas" component={OfficePageAdmin} />
                <Route exact path="/admin/citas" component={DatePageAdmin} />
                <Route exact path="/admin/mi-perfil" component={ProfilePageAdmin} />
                <Route exact path="/admin/articulos" component={ArticlesPageAdmin} />
                <Route exact path="/admin/servicios" component={ServicesPageAdmin} />

                <Route exact path="/admin/ingreso" component={SignInPageAdmin} />
              </MainDashboard>
            </>
          ) : (
            <>
              <Route exact path="/admin/ingreso" component={SignInPageAdmin} />
              <Redirect exact from="/admin/*" to="/admin/ingreso" />
            </>
          )}
        </>
      )}

      {isPatientPage && (
        <>
          {authPatient ? (
            <>
              <MainDashboard>
                <Route exact path="/paciente/tablero" component={DashboardPagePatient} />
                <Route exact path="/paciente/mi-perfil" component={ProfilePagePatient} />
                <Route exact path="/paciente/horarios" component={SurgeriesPagePatient} />
                <Route exact path="/paciente/reservar" component={DatesPagePatient} />
                <Route exact path="/paciente/seguimiento" component={TrackingPagePatient} />

                <Route exact path="/paciente/ingreso" component={SignInPagePatient} />
                <Route exact path="/paciente/registro" component={SignUpPagePatient} />
              </MainDashboard>
            </>
          ) : (
            <>
              <Route exact path="/paciente/ingreso" component={SignInPagePatient} />
              <Route exact path="/paciente/registro" component={SignUpPagePatient} />
              {/*<Redirect from="/paciente/*" to="/paciente/ingreso" />*/}
            </>
          )}
        </>
      )}

      {isDoctorPage && (
        <>
          {authDoctor ? (
            <>
              <MainDashboard>
                <Route exact path="/medico/tablero" component={DashboardPageDoctor} />
                <Route exact path="/medico/mi-perfil" component={ProfilePageDoctor} />
                <Route exact path="/medico/horarios" component={SchedulesPageDoctor} />
                <Route exact path="/medico/consultas" component={DatesPageDoctor} />
                <Route exact path="/medico/informes" component={ReportsPageDoctor} />

                <Route exact path="/medico/ingreso" component={SignInPageDoctor} />
              </MainDashboard>
            </>
          ) : (
            <>
              <Route exact path="/medico/ingreso" component={SignInPageDoctor} />
              <Redirect from="/medico/*" to="/medico/ingreso" />
            </>
          )}
        </>
      )}

      <MainLanding>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/quienes-somos" component={AboutUsPage} />
        <Route exact path="/contactenos" component={ContactPage} />
        <Route exact path="/libro-reclamaciones" component={ClaimsPage} />
        <Route exact path="/galeria" component={GalleryPage} />
        <Route exact path="/servicios" component={ServicesPage} />
      </MainLanding>
    </Switch>
  )
}

// const PrivateRoute = ({ children, ...rest }) => {
//   const { authAdmin } = useContext(MyContext);
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         authAdmin ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/admin/sign-in",
//               state: { from: location }
//             }}
//           />
//         )
//       }
//     />
//   );
// }

export default Routes;