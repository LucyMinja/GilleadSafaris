export default function BottomBar() {
  return (
    <div style={{ borderTop: '1px solid rgba(241,234,224,0.15)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p style={{ fontSize: '12px', color: 'rgba(241,234,224,0.55)', letterSpacing: '0.04em' }}>
          © {new Date().getFullYear()} Gillead Safaris Tanzania Ltd. All rights reserved.
        </p>
        <p style={{ fontSize: '12px', color: 'rgba(241,234,224,0.55)', letterSpacing: '0.04em' }}>
          Registered in Tanzania · TALA Licensed
        </p>
      </div>
    </div>
  );
}
