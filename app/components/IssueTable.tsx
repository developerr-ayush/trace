"use client"
import { Badge, Table } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
async function allIssues() {
  const res = await fetch("http://localhost:3000/api/issues")
  return res.json()
}
function statusData(status: string) {
  let element = <Badge color='orange'>Open</Badge>
  if (status == "IN_PROGRESS")
    element = <Badge color='blue'>Open</Badge>

  if (status == "closed")
    element = <Badge color='green'>Open</Badge>

  return element
}
export const IssueTable = () => {
  function dateFormat(date: any) {
    let newDate = new Date(date)
    // Format the date as 'Mon, 1st Jan 2024' in Indian style
    const options: object = { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = newDate.toLocaleDateString('en-IN', options);
    return formattedDate;
  }
  const [issue, setIssue] = useState([])
  useEffect(() => {
    allIssues().then(res => {
      setIssue(res)
    })
  }, [])
  // const issue = await allIssues()
  if (!issue.length) return (
    <div>
      No Data Found
    </div>
  )
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Issue Number</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Issue Title</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {issue.map((iss: any) => {
          return (<Table.Row key={iss.id}>
            <Table.RowHeaderCell>{iss.id}</Table.RowHeaderCell>
            <Table.Cell>{iss.title}</Table.Cell>
            <Table.Cell>{statusData(iss.status)}</Table.Cell>
            <Table.Cell>{dateFormat(iss.createdAt)}</Table.Cell>
          </Table.Row>)
        })}
      </Table.Body>
    </Table.Root>
  )
}

