const assert = require('assert')
const { createServer } = require('http')
const { connect } = require('net')

const server = createServer(
  { headersTimeout: 5000, requestTimeout: 10000, connectionsCheckingInterval: 500 },
  function connectionListener(_, res) {
    res.writeHead(204, { connection: 'close' })
    res.end('')
  }
)
 

server.listen(1234, function() {
  console.log("started")
  const client = connect(server.address().port)
  const request = ['GET / HTTP/1.1\r\n', 'Host: localhost', '\r\n\r\n']
  let response = ''
  let sentPackets = 0

  function sendPacket() {
    client.write(request.shift())
    console.log("send packet")
    sentPackets++
  }

  function verifyResult() {
    assert.strictEqual(response, 'HTTP/1.1 408 Request Timeout\r\nConnection: close\r\n\r\n')
    assert(sentPackets, 2)
    console.log("Server close")
 //   server.close()
  }

  client.on('data', function (chunk) {
    response += chunk.toString('utf-8')
  })

  client.on('end', verifyResult)

  client.resume()

  setTimeout(sendPacket, 600).unref()
  setTimeout(sendPacket, 4000).unref()
  setTimeout(sendPacket, 6000).unref()
})
