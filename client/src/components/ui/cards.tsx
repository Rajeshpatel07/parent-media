

const cardData = [
  {
    name: "Sarah Johnson",
    quote: "ParentConnect has made it so much easier to stay in touch with my child's teachers and other parents. I feel more connected to the school community than ever before!",
  },
  {
    name: "Michael Lee",
    quote: "The event planning features are fantastic! Organizing class parties and field trips has never been this simple. It's a game-changer for busy parents.",
  },
  {
    name: "Emily Rodriguez",
    quote: "I love how ParentConnect keeps everything in one place - from school announcements to parent-teacher conference scheduling. It's made my life so much more organized!",
  },
]
export function Cards() {

  return (
    <>
      {
        cardData.map((testimonial, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <p className="text-gray-600 dark:text-gray-300 mb-4">"{testimonial.quote}"</p>
            <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
          </div>
        ))
      }
    </>
  )
}
