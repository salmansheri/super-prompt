import ProfileClient from "./ProfileClient";
import getCurrentUser from "@/actions/getCurrentUser";
import getPostByUserId from "@/actions/getPostByUserId";
import getUserById from "@/actions/getUserById";






interface IMyProfilePageProps {
}
// @ts-expect-error async Server component
const MyProfilePage: React.FC<IMyProfilePageProps> = async (props) => {
  const currentUser = await getCurrentUser(); 
  const user = await getUserById(currentUser?.id as string); 
 


  return (
    <div>
        <ProfileClient 
          name={currentUser?.name as string}
          desc="Welcome to your personalized profile page"
          data={user?.prompts}
          

        />
    </div>
  );
};

export default MyProfilePage;
