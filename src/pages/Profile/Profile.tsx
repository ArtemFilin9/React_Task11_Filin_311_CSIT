import { useAppSelector } from '../../app/hooks'

const Profile = () => {
  const user = useAppSelector((state) => state.user.user)

  return (
    <div>
      <h1>Profile</h1>
      {user && (
        <>
          <p>ID: {user.id}</p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </>
      )}
    </div>
  )
}

export default Profile