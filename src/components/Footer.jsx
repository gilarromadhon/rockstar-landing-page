const CHAMPIONS_IMG =
  "https://cghpdqioexwedswxjqvs.supabase.co/storage/v1/object/public/images/rockstar/champions.png";

const ABOUT_LINKS = ["About Us", "Franchising Opportunity", "Contact Us", "Career"];
const PROGRAM_LINKS = ["Program Overview", "Preschool & Kindergarten", "Term Overview", "Private Instructions", "Camps", "Rules & Policies"];
const EVENT_LINKS = ["Elite Championships", "RockOlympics", "Gymnastics Testing", "Taekwondo Testing", "RAD Ballet Testing", "CSTD Contemporary Dance Testing", "Dance Recital", "Ballet & Contemporary Dance Recital", "Broadway Recital", "Cheerleading Recital"];

function LinkGroup({ title, links }) {
  return (
    <div className="footer__group">
      <h4>{title}</h4>
      <ul>
        {links.map((l) => (
          <li key={l}><a href="#footer">{l}</a></li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer id="footer" className="footer-wrap">
      <div className="footer">
        {/* Just the 4 link columns — champions image and the trial
            button live in their own row below (see footer__bottom),
            entirely outside this grid. */}
        <div className="footer__grid">
          <div className="footer__col footer__col--about">
            <LinkGroup title="About Us" links={ABOUT_LINKS} />
          </div>

          <div className="footer__col footer__col--programs">
            <LinkGroup title="Programs" links={PROGRAM_LINKS} />
          </div>

          <div className="footer__col footer__col--events">
            <LinkGroup title="Events & Competitions" links={EVENT_LINKS} />
          </div>

          <div className="footer__col footer__col--stacked">
            <LinkGroup title="Schedules & Locations" links={["List of cities"]} />
            <LinkGroup title="Blog" links={["Blog"]} />
            <LinkGroup title="Promotional Partnership" links={["Promotional Partnership", "Rockstar Partnership"]} />
          </div>
        </div>

        {/* A single row, space-between, always below the grid — same
            arrangement on mobile and desktop, no grid placement needed. */}
        <div className="footer__bottom">
          <img
            className="footer__champions"
            src={CHAMPIONS_IMG}
            alt="Creating Future Life Champions — one-stop physical education center for kids & teens"
          />
          <button className="btn-trial footer__trial">Get a free trial</button>
        </div>
      </div>
    </footer>
  );
}
