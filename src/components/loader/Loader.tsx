// Loader.tsx — kept as a named export for any future use,
// but the main app now uses an inline pure-CSS spinner in App.tsx
// react-spinners dependency has been removed.

export default function Loader({ loading }: { loading: any }) {
  if (!loading) return null;
  return (
    <div className="flex justify-center items-center fixed inset-0 z-50 bg-bg">
      <div className="w-8 h-8 rounded-full border-2 border-softBg border-t-cta animate-spin" />
    </div>
  );
}
