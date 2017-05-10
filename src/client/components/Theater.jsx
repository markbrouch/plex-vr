import React from 'react'
import { connect } from 'react-redux'
import qs from 'qs'

import 'aframe'
import { Entity, Scene } from 'aframe-react'

const Theater = ({
  match: { params: { id } },
  uuid,
  authToken,
  serverId,
  resources
}) => {
  const serverUri = resources
    .find(resource => resource.clientIdentifier === serverId)
    .connections.find(connection => connection.local === '0').uri

  const params = qs.stringify({
    // hasMDE: 1,
    path: `/library/metadata/${id}`,
    // mediaIndex:0,
    // partIndex:0,
    protocol: 'http',
    fastSeek: 1,
    directPlay: 0,
    directStream: 1,
    subtitleSize: 100,
    audioBoost: 100,
    // location:'wan',
    maxVideoBitrate: 4000,
    videoQuality: 100,
    videoResolution: '1280x720',
    session: uuid,
    // offset:0,
    // subtitles:burn,
    // copyts:1,
    // 'Accept-Language':'en',
    'X-Plex-Session-Identifier': uuid,
    // 'X-Plex-Chunked':1,
    'X-Plex-Product': 'Plex VR',
    'X-Plex-Version': '0.6.0',
    'X-Plex-Client-Identifier': uuid,
    'X-Plex-Platform': 'Chrome',
    'X-Plex-Platform-Version': '58.0',
    'X-Plex-Device': 'OSX',
    'X-Plex-Device-Name': 'Plex VR (Chrome)',
    // 'X-Plex-Device-Screen-Resolution':'1238x791,2560x1440',
    'X-Plex-Token': authToken
  })

  return (
    <Scene stats>
      <a-assets>
        <video
          id="sample"
          autoPlay
          loop="true"
          src={`${serverUri}/video/:/transcode/universal/start?${params}`}
          playsInline
        />
      </a-assets>
      <Entity
        primitive="a-video"
        src="#sample"
        width="16"
        height="9"
        position="0 0 -10"
      />
    </Scene>
  )
}

export default connect(
  ({
    uuid,
    userStore: { user: { authToken } },
    library: { server: serverId },
    resourcesStore: { resources }
  }) => ({ uuid, authToken, serverId, resources })
)(Theater)
