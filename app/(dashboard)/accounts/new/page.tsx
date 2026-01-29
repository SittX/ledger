import Form from "next/form";

export default async function AccountCreatePage() {
  async function onBoard(formData: FormData) {"use server"};

  return (
    <div className="min-w-full">
<div className="max-w-md">
        <h1 className="text-2xl font-bold">Create New Account</h1>
        <p className="text-gray-600 mb-4">Fill in the details below to create a new account.</p>
      </div>

<Form action={onBoard} className="min-w-lg max-w-xl mx-auto border border-ghost rounded-lg p-6 flex flex-col gap-4">
      
      <div>
        <label className="label mb-2 font-medium" htmlFor="title">Account Name</label>
        <input type="text" id="title" name="title" className="input w-full"/>
          {
            false &&
            <p className="label">Info</p>
          }
      </div>

      <div>
        <label className="label mb-2 font-medium" htmlFor="description">Description</label>
        <textarea id="description" name="description" className="textarea w-full"/>
          {
            false &&
            <p className="label">Description</p>
          }
      </div>

      <div>
          <label className="label mb-2 font-medium" htmlFor="includeInNetworth">
            <input id="includeInNetworth" name="includeInNetworth" type="checkbox" className="toggle checked:bg-primary checked:border-primary"/>
            Include In Networth</label>
          {
            false &&
            <p className="label">Description</p>
          }
      </div>

    </Form>
    </div>
    
  );
}
