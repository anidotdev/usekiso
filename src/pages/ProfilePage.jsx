export function ProfilePage({ userName }) {
  return (
    <section className="page profile-page">
      <span className="mono section-kicker">PROFILE</span>
      <h1>{userName}</h1>

      <div className="profile-account">
        <div>
          <span className="mono">ACCOUNT</span>
          <strong>{userName}</strong>
          <p>Your Kiso account is used for authentication and access to the platform.</p>
        </div>

        <div>
          <span className="mono">CURRENT PATHS</span>
          <strong>Cloud + Interview DSA</strong>
          <p>Learn the infrastructure, then use reported interview questions to prepare with better signal.</p>
        </div>
      </div>
    </section>
  )
}
