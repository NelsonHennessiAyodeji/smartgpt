import { currentUser, UserButton, auth } from "@clerk/nextjs";

// Clerk makes things easier with authentication, I can easily access my userr from here.
const UserProfile = async () => {
  const user = await currentUser();
  //   const { userId } = auth(); //I dont need to use await here
  //   console.log(user, userId);

  return (
    <div className="px-4 flex items-center gap-2">
      <UserButton afterSignOutUrl="/"></UserButton>
      <p>{user.emailAddresses[0].emailAddress}</p>
    </div>
  );
};

export default UserProfile;
