import React, { useState } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Users, 
  BookOpen, 
  DollarSign, 
  UserX, 
  UserCheck,
  Eye,
  Search,
  Filter,
  Menu,
  X
} from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data - replace with your backend API calls
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'React Development',
      description: 'Complete React course from basics to advanced',
      price: 299,
      duration: '12 weeks',
      status: 'active',
      enrolled: 45
    },
    {
      id: 2,
      title: 'Node.js Backend',
      description: 'Server-side development with Node.js',
      price: 399,
      duration: '10 weeks',
      status: 'active',
      enrolled: 32
    }
  ]);

  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      joinDate: '2024-01-15',
      status: 'active',
      enrolledCourses: ['React Development', 'Node.js Backend']
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1234567891',
      joinDate: '2024-02-20',
      status: 'active',
      enrolledCourses: ['React Development']
    }
  ]);

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      courseId: 1,
      courseName: 'React Development',
      studentName: 'John Doe',
      amount: 299,
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: 2,
      courseId: 1,
      courseName: 'React Development',
      studentName: 'Jane Smith',
      amount: 299,
      date: '2024-02-20',
      status: 'completed'
    }
  ]);

  const [enrollments, setEnrollments] = useState([
    {
      id: 1,
      studentId: 1,
      studentName: 'John Doe',
      courseId: 1,
      courseName: 'React Development',
      enrollDate: '2024-01-15',
      status: 'active'
    },
    {
      id: 2,
      studentId: 1,
      studentName: 'John Doe',
      courseId: 2,
      courseName: 'Node.js Backend',
      enrollDate: '2024-01-20',
      status: 'active'
    }
  ]);

  // Course Management Functions
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    status: 'active'
  });

  const handleCourseSubmit = () => {
    if (!courseForm.title || !courseForm.description || !courseForm.price || !courseForm.duration) {
      alert('Please fill all fields');
      return;
    }
    
    if (editingCourse) {
      setCourses(courses.map(course => 
        course.id === editingCourse.id 
          ? { ...course, ...courseForm, price: Number(courseForm.price) }
          : course
      ));
    } else {
      setCourses([...courses, {
        id: Date.now(),
        ...courseForm,
        price: Number(courseForm.price),
        enrolled: 0
      }]);
    }
    setShowCourseModal(false);
    setCourseForm({ title: '', description: '', price: '', duration: '', status: 'active' });
    setEditingCourse(null);
  };

  const deleteCourse = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  const editCourse = (course) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title,
      description: course.description,
      price: course.price.toString(),
      duration: course.duration,
      status: course.status
    });
    setShowCourseModal(true);
  };

  // Student Management Functions
  const deleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student account?')) {
      setStudents(students.filter(student => student.id !== id));
    }
  };

  const suspendStudent = (id) => {
    setStudents(students.map(student => 
      student.id === id 
        ? { ...student, status: student.status === 'suspended' ? 'active' : 'suspended' }
        : student
    ));
  };

  // Enrollment Management Functions
  const deleteEnrollment = (id) => {
    if (window.confirm('Are you sure you want to remove this enrollment?')) {
      setEnrollments(enrollments.filter(enrollment => enrollment.id !== id));
    }
  };

  const suspendEnrollment = (id) => {
    setEnrollments(enrollments.map(enrollment => 
      enrollment.id === id 
        ? { ...enrollment, status: enrollment.status === 'suspended' ? 'active' : 'suspended' }
        : enrollment
    ));
  };

  const CourseModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">
          {editingCourse ? 'Edit Course' : 'Add New Course'}
        </h3>
        <div>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Course Title"
              value={courseForm.title}
              onChange={(e) => setCourseForm({...courseForm, title: e.target.value})}
              className="w-full p-2 border rounded-md"
            />
            <textarea
              placeholder="Course Description"
              value={courseForm.description}
              onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
              className="w-full p-2 border rounded-md h-20"
            />
            <input
              type="number"
              placeholder="Price"
              value={courseForm.price}
              onChange={(e) => setCourseForm({...courseForm, price: e.target.value})}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Duration (e.g., 12 weeks)"
              value={courseForm.duration}
              onChange={(e) => setCourseForm({...courseForm, duration: e.target.value})}
              className="w-full p-2 border rounded-md"
            />
            <select
              value={courseForm.status}
              onChange={(e) => setCourseForm({...courseForm, status: e.target.value})}
              className="w-full p-2 border rounded-md"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex gap-2 mt-6">
            <button
              onClick={handleCourseSubmit}
              className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              {editingCourse ? 'Update' : 'Create'}
            </button>
            <button
              onClick={() => {
                setShowCourseModal(false);
                setEditingCourse(null);
                setCourseForm({ title: '', description: '', price: '', duration: '', status: 'active' });
              }}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const CoursesTab = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Course Management</h2>
        <button
          onClick={() => setShowCourseModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={20} />
          Add Course
        </button>
      </div>
      
      <div className="grid gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white p-6 rounded-lg shadow-md border">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
                <p className="text-gray-600 mt-1">{course.description}</p>
                <div className="flex gap-4 mt-3">
                  <span className="text-sm text-gray-500">Price: ${course.price}</span>
                  <span className="text-sm text-gray-500">Duration: {course.duration}</span>
                  <span className="text-sm text-gray-500">Enrolled: {course.enrolled} students</span>
                  <span className={`text-sm px-2 py-1 rounded ${
                    course.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {course.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => editCourse(course)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-md"
                >
                  <Edit3 size={18} />
                </button>
                <button
                  onClick={() => deleteCourse(course.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-md"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const StudentsTab = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Student Management</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Courses</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.filter(student => 
              student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              student.email.toLowerCase().includes(searchTerm.toLowerCase())
            ).map(student => (
              <tr key={student.id}>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    <div className="text-sm text-gray-500">{student.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{student.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{student.joinDate}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    student.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {student.enrolledCourses.length} courses
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => suspendStudent(student.id)}
                      className={`p-2 rounded-md ${
                        student.status === 'suspended'
                          ? 'text-green-600 hover:bg-green-100'
                          : 'text-orange-600 hover:bg-orange-100'
                      }`}
                      title={student.status === 'suspended' ? 'Activate' : 'Suspend'}
                    >
                      {student.status === 'suspended' ? <UserCheck size={18} /> : <UserX size={18} />}
                    </button>
                    <button
                      onClick={() => deleteStudent(student.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-md"
                      title="Delete Account"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const TransactionsTab = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Course Transactions</h2>
      
      <div className="grid gap-6">
        {courses.map(course => {
          const courseTransactions = transactions.filter(t => t.courseId === course.id);
          const totalRevenue = courseTransactions.reduce((sum, t) => sum + t.amount, 0);
          
          return (
            <div key={course.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
                  <div className="flex gap-4 mt-2">
                    <span className="text-sm text-gray-600">
                      <Users className="inline w-4 h-4 mr-1" />
                      {courseTransactions.length} enrollments
                    </span>
                    <span className="text-sm text-gray-600">
                      <DollarSign className="inline w-4 h-4 mr-1" />
                      ${totalRevenue} revenue
                    </span>
                  </div>
                </div>
              </div>
              
              {courseTransactions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left">Student</th>
                        <th className="px-4 py-2 text-left">Amount</th>
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {courseTransactions.map(transaction => (
                        <tr key={transaction.id}>
                          <td className="px-4 py-2">{transaction.studentName}</td>
                          <td className="px-4 py-2">${transaction.amount}</td>
                          <td className="px-4 py-2">{transaction.date}</td>
                          <td className="px-4 py-2">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                              {transaction.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No enrollments yet</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const EnrollmentsTab = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Enrollments</h2>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Enroll Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {enrollments.map(enrollment => (
              <tr key={enrollment.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {enrollment.studentName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {enrollment.courseName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {enrollment.enrollDate}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    enrollment.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {enrollment.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => suspendEnrollment(enrollment.id)}
                      className={`p-2 rounded-md ${
                        enrollment.status === 'suspended'
                          ? 'text-green-600 hover:bg-green-100'
                          : 'text-orange-600 hover:bg-orange-100'
                      }`}
                      title={enrollment.status === 'suspended' ? 'Activate' : 'Suspend'}
                    >
                      {enrollment.status === 'suspended' ? <UserCheck size={18} /> : <UserX size={18} />}
                    </button>
                    <button
                      onClick={() => deleteEnrollment(enrollment.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-md"
                      title="Delete Enrollment"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 relative`}>
        {/* Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1.5 shadow-md hover:bg-gray-50 z-10"
        >
          {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
        </button>

        {/* Logo/Brand */}
        <div className={`px-6 py-6 border-b border-gray-200 ${!sidebarOpen && 'px-3'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <BookOpen className="text-white" size={24} />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-xl font-bold text-gray-900">EduAdmin</h1>
                <p className="text-xs text-gray-500">Course Management</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {[
              { id: 'courses', label: 'Courses', icon: BookOpen, description: 'Manage courses' },
              { id: 'students', label: 'Students', icon: Users, description: 'Student accounts' },
              { id: 'transactions', label: 'Transactions', icon: DollarSign, description: 'Payment history' },
              { id: 'enrollments', label: 'Enrollments', icon: Eye, description: 'Course enrollments' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } ${!sidebarOpen && 'justify-center px-2'}`}
                title={!sidebarOpen ? tab.label : ''}
              >
                <tab.icon size={20} className={`${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'} flex-shrink-0`} />
                {sidebarOpen && (
                  <div>
                    <div className="font-medium">{tab.label}</div>
                    <div className="text-xs text-gray-500">{tab.description}</div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* User Profile */}
        <div className={`absolute bottom-0 ${sidebarOpen ? 'w-64' : 'w-16'} p-4 border-t border-gray-200 bg-white transition-all duration-300`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-medium">A</span>
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">Admin User</div>
                <div className="text-xs text-gray-500">Super Admin</div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 capitalize">{activeTab}</h2>
                <p className="text-sm text-gray-500">
                  {activeTab === 'courses' && 'Create and manage your courses'}
                  {activeTab === 'students' && 'Manage student accounts and profiles'}
                  {activeTab === 'transactions' && 'View course enrollment transactions'}
                  {activeTab === 'enrollments' && 'Manage student course enrollments'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">Welcome back!</div>
                  <div className="text-xs text-gray-500">Last login: Today</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="p-6">
            {activeTab === 'courses' && <CoursesTab />}
            {activeTab === 'students' && <StudentsTab />}
            {activeTab === 'transactions' && <TransactionsTab />}
            {activeTab === 'enrollments' && <EnrollmentsTab />}
          </div>
        </main>
      </div>

      {/* Course Modal */}
      {showCourseModal && <CourseModal />}
    </div>
  );
};

export default AdminPanel;