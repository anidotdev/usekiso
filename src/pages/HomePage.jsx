import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { companies, interviewQuestions } from '../data/interviews'
import { cloudLessons } from '../data/cloud'

export function HomePage() {
  return (
    <section className="home-page">
      <div className="hero-shell">
        <div className="hero-grid" aria-hidden="true" />

        <div className="cloud-floats" aria-hidden="true">
          <img
            className="cloud-float cloud-float-azure"
            src="/cloud-logos/azure.png"
            alt=""
          />
          <img
            className="cloud-float cloud-float-aws"
            src="/cloud-logos/aws.png"
            alt=""
          />
          <img
            className="cloud-float cloud-float-google"
            src="/cloud-logos/google-cloud.png"
            alt=""
          />
          <img
            className="cloud-float cloud-float-oracle"
            src="/cloud-logos/oracle.png"
            alt=""
          />
        </div>

        <div className="hero-copy">
          <span className="hero-kicker mono">
            TECHNICAL LEARNING, WITHOUT THE GUESSWORK.
          </span>

          <h1>
            Stop randomly
            <br />
            learning <span className="hero-accent">cloud</span>.
          </h1>

          <p className="hero-lead">
            Learn Cloud from first principles, then prepare for DSA interviews
            using questions reported from real interview experiences.
          </p>

          <div className="hero-actions">
            <Link className="button button-accent" to="/cloud">
              Start Cloud <ArrowRight size={15} />
            </Link>

            <Link className="button button-outline" to="/companies">
              Explore Companies <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        <div className="hero-foot">
          <span className="mono">CLOUD IS THE MAIN PATH</span>

          <span className="mono">
            <strong>{cloudLessons.length}</strong> lessons ·{' '}
            <strong>{companies.length}</strong> companies ·{' '}
            <strong>{interviewQuestions.length}</strong> canonical questions
          </span>
        </div>
      </div>

      <section className="home-section">
        <div className="section-intro">
          <span className="mono section-kicker">THE KISO PATH</span>

          <h2>
            Learn the systems. Then study the questions companies actually ask.
          </h2>

          <p>
            Start with the fundamentals of Cloud infrastructure. When you are
            ready for interviews, move from generic problem lists to company
            specific interview evidence.
          </p>
        </div>

        <div className="principle-list">
          <div className="principle">
            <span className="principle-no mono">01</span>

            <div>
              <h3>Build the foundation</h3>
              <p>
                Start with servers, data centers, cloud computing,
                virtualization, and the infrastructure underneath modern
                applications.
              </p>
              <Link className="text-link" to="/cloud">
                Start the Cloud course <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>

          <div className="principle">
            <span className="principle-no mono">02</span>

            <div>
              <h3>Prepare with signal</h3>
              <p>
                Pick a company and see the DSA questions reported in interview
                experiences instead of choosing blindly from a giant problem list.
              </p>
              <Link className="text-link" to="/companies">
                Explore companies <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>

          <div className="principle">
            <span className="principle-no mono">03</span>

            <div>
              <h3>Understand the pattern</h3>
              <p>
                Every reported question is connected to a topic and technique,
                so the dataset gives you more than a title. It gives you context.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section home-snapshot">
        <div className="snapshot-copy">
          <span className="mono section-kicker">START HERE</span>

          <h2>What Is a Server?</h2>

          <p>
            Start with the machine that actually does the work behind a service.
            Then move through data centers, cloud computing, virtualization, and
            the rest of the infrastructure stack.
          </p>

          <Link className="text-link" to="/cloud">
            Start the Cloud course <ArrowUpRight size={13} />
          </Link>
        </div>

        <div className="snapshot-stats">
          <div>
            <span className="mono">CLOUD LESSONS</span>
            <strong>{cloudLessons.length}</strong>
          </div>

          <div>
            <span className="mono">COMPANIES</span>
            <strong>{companies.length}</strong>
          </div>

          <div>
            <span className="mono">QUESTIONS</span>
            <strong>{interviewQuestions.length}</strong>
          </div>
        </div>
      </section>
    </section>
  )
}
