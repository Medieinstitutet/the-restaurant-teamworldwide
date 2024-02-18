const ContactPage = () => {
  return (
    <div className='contact min-h-screen mt-16 pt-20 pb-44 flex flex-col items-center gap-10'>
        <form className='contact-form form-control items-center w-full max-w-lg flex flex-col gap-8 px-10 py-5 rounded-lg'>
          <h1 className='text-slate-600'>Contact</h1>  
          <div className="flex flex-col w-full">
            <span className="label-text">Name *</span>
            <input type="text" className="input input-bordered w-full max-w-full mt-2" required/>
          </div>
          <div className="flex flex-col w-full">
            <span className="label-text">Booking Number</span>
            <input type="text" className="input input-bordered w-full max-w-full mt-2"/>
          </div>
          <div className="flex flex-col w-full">
            <span className="label-text">Title</span>
            <input type="text" className="input input-bordered w-full max-w-full mt-2"/>
          </div>
          <div className="flex flex-col w-full">
            <span className="label-text">Message *</span>
            <textarea className="textarea textarea-bordered w-full max-w-full mt-2" required/>
          </div>
          <button className='btn px-8 w-full bg-primary hover:bg-neutral-50 text-neutral-50 hover:text-primary border-primary'>Send</button>
        </form>
    </div>
  )
}

export default ContactPage