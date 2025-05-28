import { auth } from "@/auth"
import { redirect } from "next/navigation"
import clientPromise from "@/libs/mongo"

export default async function Dashboard() {
  const session = await auth()
  
  if (!session) {
    redirect("/")
  }

  // Connect to MongoDB
  const client = await clientPromise
  const db = client.db()
  
  // Get user details from MongoDB
  const mongoUser = await db.collection("users").findOne({ 
    email: session.user.email 
  })

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      {/* Session Data */}
      <div className="bg-white shadow rounded-lg p-6 mb-4">
        <h2 className="text-xl font-semibold mb-4">Session Data</h2>
        <div className="space-y-2">
          <p><span className="font-medium">Name (from session):</span> {session.user.name}</p>
          <p><span className="font-medium">Email (from session):</span> {session.user.email}</p>
        </div>
      </div>

      {/* MongoDB Data */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">MongoDB Data</h2>
        <div className="space-y-2">
          <p><span className="font-medium">Name (from MongoDB):</span> {mongoUser?.name || 'Not available'}</p>
          <p><span className="font-medium">Email (from MongoDB):</span> {mongoUser?.email || 'Not available'}</p>
          {mongoUser?.image && (
            <div className="mt-4">
              <img 
                src={mongoUser.image} 
                alt="Profile" 
                className="w-20 h-20 rounded-full"
              />
            </div>
          )}
          {/* Display all available MongoDB fields */}
          <div className="mt-4">
            <h3 className="font-medium mb-2">All MongoDB Fields:</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(mongoUser, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}


