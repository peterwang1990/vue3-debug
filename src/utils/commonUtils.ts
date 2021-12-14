import _ from 'lodash'

export const parseWeb3TransactionErrorMessage = (error: {
  data: { message: { toString: () => any } }
  message: any
  error: any
  toString: () => any
}) => {
  let message

  console.error(error)

  if (_.has(error, 'data.message')) {
    message = error.data.message.toString()
  } else if (_.has(error, 'message') && _.isString(error.message)) {
    message = error.message
  } else if (_.has(error, 'error') && _.isString(error.error)) {
    message = error.error
  } else {
    message = error.toString()
  }

  return message
}

export default parseWeb3TransactionErrorMessage
