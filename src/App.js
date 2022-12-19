import "./App.css";
import "./styles/app.sass";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page from "./components/Page";
import StudentList from "./components/StudentList";
import StudentAdmission from "./components/NewProduct";
import Grades from "./components/Grades";
import Edit from "./components/Grades/Edit";
import Subject from "./components/Subject";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import StudentDetail from "./components/StudentList/Edit";
import EditScore from "./components/Subject/NameAndDescription";
import CreateClass from "./components/CreateClass/NameAndDescription";
import CreateCourse from "./components/CreateCourse/NameAndDescription";
import Statistics from "./components/Statistics/index";
import Dashboard from "./components/Dashboard/index";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route
                    path="/home"
                    element={
                        <Page title="Dashboard">
                            <Dashboard />
                        </Page>
                    }
                />
                <Route
                    path="/students/add"
                    element={
                        <Page title="Student Addmission">
                            <StudentAdmission />
                        </Page>
                    }
                />
                <Route
                    path="/students/list"
                    element={
                        <Page title="Student List">
                            <StudentList />
                        </Page>
                    }
                />
                <Route
                    path="/grades/:gradeId"
                    element={
                        <Page title="Grades Detail">
                            <Grades />
                        </Page>
                    }
                />
                <Route
                    path="/edit/grades/:id"
                    element={
                        <Page title="Change class">
                            <Edit />
                        </Page>
                    }
                />
                <Route
                    path="/student-detail/:id"
                    element={
                        <Page title="Student Detail">
                            <StudentDetail />
                        </Page>
                    }
                />
                <Route
                    path="/subject/:subjectName"
                    element={
                        <Page title="Subject">
                            <Subject />
                        </Page>
                    }
                />
                <Route
                    path="/edit/score/:subjectName"
                    element={
                        <Page title="Edit Score">
                            <EditScore />
                        </Page>
                    }
                />
                <Route
                    path="/createClass"
                    element={
                        <Page title="Class">
                            <CreateClass />
                        </Page>
                    }
                />
                <Route
                    path="/createCourse"
                    element={
                        <Page title="Course">
                            <CreateCourse />
                        </Page>
                    }
                />
                <Route
                    path="/statistics"
                    element={
                        <Page title="Statistics">
                            <Statistics />
                        </Page>
                    }
                />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
        </Router>
    );
}

export default App;
