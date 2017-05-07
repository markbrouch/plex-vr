import { createAction } from 'redux-actions'

import API from '~api'

export const SECTIONS = 'SECTIONS'

export const fetchSections = createAction(SECTIONS, API.fetchSections)
