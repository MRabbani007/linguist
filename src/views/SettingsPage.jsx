// Imported Media

const SettingsPage = () => {
  return (
    <main>
      <header>
        <h1>Settings</h1>
      </header>
      <div>
        <section className="border-2 border-slate-400 rounded-lg p-3 my-3">
          <h2 className="text-lg mb-1">Account</h2>
          <div className="flex items-center gap-3">
            <span>Name</span>
            <span className="btn btn-red">Enter Name</span>
          </div>
          <div className="flex items-center gap-3 my-3">
            <span>Email</span>
            <span className="btn btn-red">Enter Email</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Change Password</span>
          </div>
        </section>
        <section className="border-2 border-slate-400 rounded-lg p-3 my-3"></section>
      </div>
    </main>
  );
};

export default SettingsPage;
