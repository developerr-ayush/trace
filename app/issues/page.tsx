import { Button, Select, Table } from '@radix-ui/themes'
import { IssueTable } from '../components/IssueTable'
import Link from 'next/link'
const Issues = () => {

  return (
    <div>

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