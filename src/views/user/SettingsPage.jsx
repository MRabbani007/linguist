export default function SettingsPage() {
  return (
    <main>
      <header>
        <h1>Settings</h1>
      </header>
      <section className="gap-0">
        <h2 className="bg-zinc-200 py-2 px-4">Account</h2>
        <div className="p-4 bg-zinc-100">
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
        </div>
      </section>
      <section className="gap-0">
        <h2 className="bg-zinc-200 py-2 px-4">Content</h2>
        <div className="p-4 bg-zinc-100">
          <p>Sentences</p>
          <div>
            <p>Display</p>
            <span>Block</span>
            <span>Table</span>
          </div>
          <div>
            <p>Show first</p>
            <p>
              <span>Primary language</span>
              <span>Translation</span>
            </p>
          </div>
          <div>
            <p>Expand</p>
            <p>
              <span>Expand</span>
              <span>Collapse</span>
            </p>
          </div>
          <p>Words</p>
          <div>
            <p>add to list</p>
            <p>
              <span>Show</span>
              <span>Hide</span>
            </p>
          </div>
          <div>
            <p>Images</p>
            <p>
              <span>Show</span>
              <span>Hide</span>
            </p>
          </div>
        </div>
      </section>
      <section className="gap-0">
        <div className="p-4 bg-zinc-100">
          <p>Last Open Page</p>
          <p>Current Lesson</p>
        </div>
      </section>
    </main>
  );
}
