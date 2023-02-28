import React from 'react'

// ** MUI
import TripViewHeader from 'src/views/trip-view/trip-view-header'
import TripViewTable from 'src/views/trip-view/trip-view-table'

function TripListing() {
  const handleLimit = () => {}
  const handlePagination = () => {}

  return (
    <>
      <TripViewHeader />
      <TripViewTable
        page={1}
        limit={10}
        total={10}
        handleLimitChange={handleLimit}
        handlePageChange={handlePagination}
      />
    </>
  )
}

export default TripListing
