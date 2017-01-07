exports.error_messages = (err) => {
  if (!err.errors){
    return []
  }

  var rv = []

  for (key in err.errors){
    rv.push(err.errors[key].message)
  }

  return rv
}

