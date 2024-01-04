"use client"
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import DropDown from '../components/Dropdown'
import IssueList from '../components/IssueList'
import { useEffect, useState } from 'react'
import { getRequest } from '../FactoryFunction'
let issuelist = [
  "All Issues",
  "Open",
  "In Progress",
  "Completed",
]
let issuesDBList = [
  "ALL ISSUES",
  "OPEN",
  "IN_PROGRESS",
  "COMPLETED"
]
const Issues = () => {
  const [tableRow, setTableRow] = useState([])
  const [filter, setFilter] = useState(0)
  useEffect(() => {
    let issues = getRequest("/api/issues")
    issues.then(res => {
      let data = res;
      if (0 != filter) {
        data = res.filter((data: any) => data.status == issuesDBList[filter])
      }
      setTableRow(data)
    })
  }, [filter])
  return (
    <div>
      <div className="head flex flex-wrap justify-between items-center  ">
        <DropDown issueList={issuelist} filter={filter} setFilter={setFilter} />
        <Button>
          <Link href="/issues/new" >
            New Issues
          </Link>
        </Button>
      </div>
      {!!tableRow.length ? <IssueList rows={tableRow} /> : <div className="Error">No Data Found</div>}
    </div>
  )

}
export default Issues;