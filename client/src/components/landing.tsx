import { Footer } from './ui/footer';
import Header from './header';
import { List } from './ui/list';
import { Cards } from './ui/cards';
import { Link } from 'react-router-dom';

export default function LandingPage() {

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Header />

      <main className="container mx-auto px-6 py-8">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Connect with Your School Community
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            ParentConnect brings parents together, fostering communication and collaboration for a better school experience.
          </p>
          <Link to='/signup' className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 transform hover:scale-105">
            Join Now
          </Link>
        </section>

        <section className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Stay Informed and Engaged</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              With ParentConnect, you'll never miss important school updates, events, or opportunities to get involved in your child's education.
            </p>
            <ul className="space-y-4">
              <List />
            </ul>
          </div>
          <div className="relative h-64 md:h-auto">
            <img
              src="./vite.svg"
              alt="Parents using ParentConnect app"
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>

        <section className="bg-blue-100 dark:bg-blue-900 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            What Parents Are Saying
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Cards />
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Connect?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join ParentConnect today and become an active part of your child's school community.
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 transform hover:scale-105">
            Sign Up Now
          </button>
        </section>
      </main>
      <Footer />
    </div>
  )
}
