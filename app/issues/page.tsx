import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import DropDown from '../components/Dropdown';
import IssueList from '../components/IssueList';

const issueStatusList = ["All Issues", "Open", "In Progress", "Completed"];
const dbIssueList = ["All Issues", "OPEN", "IN_PROGRESS", "CLOSED"];

export default async function Issues({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  let { status } = searchParams
  const data = await fetch(`https://trace-olive.vercel.app/api/issues${status ? "?status=" + status : ""}`, { cache: "no-cache" });
  const tableRow = await data.json();
  return (
    <div>
      <div className="head flex flex-wrap justify-between items-center">
        <DropDown selected={status} issueList={issueStatusList} dbIssueList={dbIssueList} />
        <Button >
          <Link href="/issues/new">New Issues</Link>
        </Button>
      </div>
      <IssueList rows={tableRow} />
    </div>
  );
};