const ContactPage = () => {
  return (
    <div className='contact min-h-screen mt-16 pt-20 pb-44 flex flex-col items-center gap-10'>
      <h1 className='text-neutral-50'>Contact</h1>
      <form className='contact-form form-control w-full max-w-lg flex flex-col gap-6 px-10 py-5 rounded-lg'>
        <div>
          <span className="label-text">Name *</span>
          <input type="text" className="input input-bordered w-full max-w-full mt-2" required/>
        </div>
        <div>
          <span className="label-text">Booking Number</span>
          <input type="text" className="input input-bordered w-full max-w-full mt-2"/>
        </div>
        <div>
          <span className="label-text">Title</span>
          <input type="text" className="input input-bordered w-full max-w-full mt-2"/>
        </div>
        <div>
          <span className="label-text">Message *</span>
          <textarea className="textarea textarea-bordered w-full max-w-full mt-2" required/>
        </div>
        <button className='btn self-center px-8 bg-primary hover:bg-neutral-50 text-neutral-50 hover:text-primary border-primary'>Send</button>
      </form>
    </div>
  )
}

export default ContactPage