module.exports = {
    exportPathMap: function () {
      return {
        '/': { page: '/' },
        '/404': { page: '/404' },
        '/account': { page: '/account' },
        '/customers': { page: '/customers' },
        '/login': { page: '/login' },
        '/register': { page: '/register' },
        '/dashboard': { page: '/dashboard' },
        '/course/[course_id]/overview': { page: '/course/[course_id]/overview' },
        '/course/[course_id]/proposal-invitation': { page: '/course/[course_id]/proposal-invitation' },
        '/course/[course_id]/published-projects': { page: '/course/[course_id]/published-projects' },
        '/course/[course_id]/recieved-projects': { page: '/course/[course_id]/recieved-projects' },
        '/course/[course_id]/skills-qualifications': { page: '/course/[course_id]/skills-qualifications' },
        '/course/[course_id]/invite': { page: '/course/[course_id]/invite' },
        '/course/[course_id]/rank-project': { page: '/course/[course_id]/rank-project' },
        '/course/[course_id]/student-profile': { page: '/course/[course_id]/student-profile' },
        '/course/[course_id]/students': { page: '/course/[course_id]/students' },
        '/course/[course_id]/project/[project_id]/overview': { page: '/course/[course_id]/project/[project_id]/overview' },
      }
    }
  }
  