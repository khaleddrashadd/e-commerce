import {formatter} from '@/utils/currency-helper'

const Currency = ({value}) => {
  return (
    <div className='font-semibold'>{formatter.format(value)}</div>
  )
}
export default Currency