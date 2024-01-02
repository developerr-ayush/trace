import { Button, Table } from '@radix-ui/themes'
import { IssueTable } from '../components/IssueTable'
import Link from 'next/link'
// import DropDown from '../components/Dropdown'
const Issues = () => {

  return (
    <div>
      {/* <DropDown /> */}
      <Button>
        <Link href="/issues/new" >
          New Issues
        </Link>
      </Button>
      <IssueTable />
    </div>
  )

}
export default Issues;