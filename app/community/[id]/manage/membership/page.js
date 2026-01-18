
import { redirect } from 'next/navigation';

export default function MembershipRedirect({ params }) {
  const { communityId } = params;
  redirect(`/community/${communityId}/manage/membership/members`);
}