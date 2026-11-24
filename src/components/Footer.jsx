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
        {/* A single grid spanning two explicit rows: the four link columns
            sit in row 1 (their heights can differ freely — Events &
            Competitions is the longest), and the champions image / trial
            button sit together in row 2, under the 1st and 4th columns
            respectively, separated from row 1 by a fixed row-gap rather
            than being stretched to match the tallest column. */}
        <div className="footer__grid">
          <div className="footer__col">
            <LinkGroup title="About Us" links={ABOUT_LINKS} />
          </div>

          <div className="footer__col">
            <LinkGroup title="Programs" links={PROGRAM_LINKS} />
          </div>

          <div className="footer__col">
            <LinkGroup title="Events & Competitions" links={EVENT_LINKS} />
          </div>

          {/* Column 4: three stacked link groups (rows 1–3) plus the
              trial button as a 4th stacked row, in the column's own
              natural flow — not pulled out to align with another column. */}
          <div className="footer__col footer__col--stacked">
            <LinkGroup title="Schedules & Locations" links={["List of cities"]} />
            <LinkGroup title="Blog" links={["Blog"]} />
            <LinkGroup title="Promotional Partnership" links={["Promotional Partnership", "Rockstar Partnership"]} />
            <button className="btn-trial footer__trial">Get a free trial</button>
          </div>

          <img
            className="footer__champions"
            src={CHAMPIONS_IMG}
            alt="Creating Future Life Champions — one-stop physical education center for kids & teens"
          />
        </div>
      </div>
    </footer>
  );
}
