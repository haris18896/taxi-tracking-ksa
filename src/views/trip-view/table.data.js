import CustomChip from 'src/@core/components/mui/chip'

export const columns = () => {
  return [
    {
      name: 'Driver Name',
      selector: row => row?.driver
    },
    {
      name: 'Vehicle',
      selector: row => row?.vehicle
    },
    {
      name: 'Trip',
      selector: row => row?.trip
    },
    {
      name: 'Date',
      selector: row => row?.date
    },
    {
      name: 'Status',
      cell: row => (
        <CustomChip
          label={row?.status}
          size='sm'
          color={row?.status === 'Completed' ? 'success' : 'error'}
          skin='light'
        />
      )
    },
    {
      name: 'Cost',
      selector: row => row?.cost
    }
  ]
}

export const rows = [
  {
    driver: 'John Doe',
    vehicle: 'Toyota',
    trip: 'Trip 1',
    date: '2021-01-01',
    status: 'Completed',
    cost: '10'
  },
  {
    driver: 'John Doe',
    vehicle: 'Toyota',
    trip: 'Trip 2',
    date: '2021-01-01',
    status: 'Completed',
    cost: '10'
  },
  {
    driver: 'John Doe',
    vehicle: 'Toyota',
    trip: 'Trip 1',
    date: '2021-01-01',
    status: 'Completed',
    cost: '10'
  },
  {
    driver: 'John Doe',
    vehicle: 'Toyota',
    trip: 'Trip 2',
    date: '2021-01-01',
    status: 'Completed',
    cost: '10'
  },
  {
    driver: 'John Doe',
    vehicle: 'Toyota',
    trip: 'Trip 1',
    date: '2021-01-01',
    status: 'Completed',
    cost: '10'
  },
  {
    driver: 'John Doe',
    vehicle: 'Toyota',
    trip: 'Trip 2',
    date: '2021-01-01',
    status: 'Completed',
    cost: '10'
  },
  {
    driver: 'John Doe',
    vehicle: 'Toyota',
    trip: 'Trip 1',
    date: '2021-01-01',
    status: 'Completed',
    cost: '10'
  },
  {
    driver: 'John Doe',
    vehicle: 'Toyota',
    trip: 'Trip 2',
    date: '2021-01-01',
    status: 'Completed',
    cost: '10'
  },
  {
    driver: 'John Doe',
    vehicle: 'Toyota',
    trip: 'Trip 1',
    date: '2021-01-01',
    status: 'Completed',
    cost: '10'
  },
  {
    driver: 'John Doe',
    vehicle: 'Toyota',
    trip: 'Trip 2',
    date: '2021-01-01',
    status: 'Completed',
    cost: '10'
  }
]
