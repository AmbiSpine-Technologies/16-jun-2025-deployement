// import { redirect } from 'next/navigation';

// export default function page({ params }) {
//           console.log("params id:", params.id);
//   // Redirect to members tab by default4
//   <h2>member ship pages</h2>
//   redirect(`/community/${params.id}/manage/membership/members`);
// }



import { redirect } from 'next/navigation';

export default function MembershipRedirect({ params }) {
  const { communityId } = params;
  redirect(`/community/${communityId}/manage/membership/members`);
}