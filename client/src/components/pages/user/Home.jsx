const HomeSection = () => {
    return (
      <section className='bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 py-16 px-6 md:px-12'>
        <div className='container mx-auto flex flex-col md:flex-row items-center justify-between gap-10'>
          {/* Text Content */}
          <div className='max-w-lg text-center md:text-left'>
            <h1 className='text-4xl md:text-5xl font-extrabold mb-6 leading-tight'>
              Welcome to Your Dashboard
            </h1>
            <p className='text-lg md:text-xl mb-8'>
              Manage your projects, track performance, and achieve your goals
              efficiently. Your one-stop platform for productivity and success.
            </p>
            <div className='flex flex-col md:flex-row gap-4 justify-center md:justify-start'>
              <button className='bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg shadow-md'>
                Get Started
              </button>
              <button className='bg-transparent border border-gray-300 dark:border-gray-500 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 font-medium py-3 px-6 rounded-lg'>
                Learn More
              </button>
            </div>
          </div>
          {/* Illustration */}
          <div className='flex justify-center'>
            <img
              src='https://via.placeholder.com/400x400.png?text=Illustration'
              alt='Dashboard Illustration'
              className='w-80 md:w-96 rounded-lg shadow-lg dark:shadow-none'
            />
          </div>
        </div>
        <LearnMore/>
      </section>
    )
  }
  
  export default HomeSection
  
  const LearnMore = () => {
    return (
      <section className='bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 py-16 '>
        <div className='container mx-auto flex flex-col md:flex-row items-center justify-between gap-10'>
        
  
          {/* Tutorial */}
          <div className='md:w-1/2'>
            <h2 className='text-3xl font-extrabold text-center md:text-left mb-6'>
              How Our Portal Works
            </h2>
            <p className='text-lg mb-6'>
              Our platform is designed with ease of use in mind, offering seamless
              navigation and an intuitive interface. Here's how you can get
              started:
            </p>
  
            <div className='space-y-6'>
              <div className='flex items-start gap-3'>
                <span className='text-2xl text-indigo-600 dark:text-indigo-400'>
                  1.
                </span>
                <p className='text-lg'>
                  <strong>Sign Up:</strong> Create an account to access all
                  features and manage your data securely.
                </p>
              </div>
              <div className='flex items-start gap-3'>
                <span className='text-2xl text-indigo-600 dark:text-indigo-400'>
                  2.
                </span>
                <p className='text-lg'>
                  <strong>Customize Your Profile:</strong> Personalize your
                  settings, upload a photo, and update your details.
                </p>
              </div>
              <div className='flex items-start gap-3'>
                <span className='text-2xl text-indigo-600 dark:text-indigo-400'>
                  3.
                </span>
                <p className='text-lg'>
                  <strong>Explore Features:</strong> Navigate through the portal
                  to explore all available tools and resources.
                </p>
              </div>
              <div className='flex items-start gap-3'>
                <span className='text-2xl text-indigo-600 dark:text-indigo-400'>
                  4.
                </span>
                <p className='text-lg'>
                  <strong>Stay Updated:</strong> Receive regular notifications and
                  updates to keep track of your progress.
                </p>
              </div>
            </div>
  
            <div className='text-center mt-8'>
              <button className='bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg shadow-md'>
                View Learning Material
              </button>
            </div>
          </div>
            {/* Image Preview */}
            <div className='flex justify-center md:w-1/2'>
            <img
              src='https://via.placeholder.com/600x400.png?text=Portal'
              alt='Portal Preview'
              className='rounded-lg shadow-lg max-w-full'
            />
          </div>
        </div>
      </section>
    )
  }
  