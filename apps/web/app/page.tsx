export default function Home() {
  return (
    <main style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1>Clinic Management Platform</h1>
      <p>Agentic flow: Registration → Appointment → Consultation → Billing → Accounts</p>
      <p>Gateway: {process.env.GATEWAY_URL}</p>
    </main>
  );
}
