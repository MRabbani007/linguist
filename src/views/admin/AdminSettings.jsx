import React from "react";

export default function AdminSettings() {
  return (
    <main>
      <header className=" from-zinc-200 to-white text-zinc-600 border-2 border-zinc-400">
        <h1 className="mx-auto font-bold text-2xl">Settings</h1>
      </header>
      <div>
        <section className="border-2 border-slate-400 rounded-lg p-3 my-3">
          <h2 className="text-lg mb-1">Form Control</h2>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="autoclose" name="autoclose" />
            <label htmlFor="autoclose">Close form after add</label>
          </div>
          <div className="flex items-center gap-3 my-3">
            <input type="checkbox" id="autoclear" name="autoclear" />
            <label htmlFor="autoclear">Clear form after add</label>
          </div>
          <div className="flex items-center gap-3 my-3">
            <input type="checkbox" id="saveinput" name="saveinput" />
            <label htmlFor="saveinput">Save form input</label>
          </div>
          <div className="flex items-center gap-3">
            <span>Change Password</span>
          </div>
        </section>
      </div>
    </main>
  );
}
