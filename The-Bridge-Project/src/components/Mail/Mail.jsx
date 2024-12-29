import React from 'react'
import './Mail.css'

const Mail = () => {
  return (
    <div className='mail-container'>
      <h1 className='mail-title'>Contact Us</h1>
      <form>
        <div className='mail-form'>
          <label htmlFor="name" className='mail-info'>Name</label>
          <input className='mail-input' type="text" id="name" name="name" placeholder="Exemple : Abderazek" required />
        </div>
        <div className='mail-form'>
          <label htmlFor="email" className='mail-info'>Email</label>
          <input placeholder="mmmmmm@gmail.com" className='mail-input' type="email" id="email" name="email" required />
        </div>
        <div className='mail-form'>
          <label htmlFor="message" className='mail-info'>Message</label>
          <textarea className='mail-inputtt' id="message" name="message" required></textarea>
        </div>
        <button type="submit">Send The Message</button>
      </form>
    </div>
  )
}

export default Mail
