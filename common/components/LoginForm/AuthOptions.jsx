import React from 'react'

function AuthOptions() {
  return (
    <div id="slide-1" className="card-body carousel-item">
      <figure>
        <img
          src="/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
          alt="Album"
        />
      </figure>
      <h2 className="card-title">New album is released!</h2>
      <p>Click the button to listen on Spotiwhy app.</p>
      <div className="card-actions justify-end">
        <button className="btn btn-primary">Listen</button>
      </div>
    </div>
  )
}

export default AuthOptions