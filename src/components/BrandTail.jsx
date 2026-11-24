const ROCKSTAR_IMG =
  "https://cghpdqioexwedswxjqvs.supabase.co/storage/v1/object/public/images/rockstar/rockstar.png";

export default function BrandTail() {
  return (
    <div className="brand-tail" aria-hidden="true">
      <img className="brand-tail__img" src={ROCKSTAR_IMG} alt="" />
    </div>
  );
}
