'use client'

import { useState } from 'react'
import { Check, ChevronDown, FileText, Filter, Flag, Link2, MoreHorizontal, Search, ShieldCheck, Upload, X } from 'lucide-react'

const rows = [
  { party: 'ANC', candidate: 'African National Congress', votes: '184', confidence: 98, tone: 'green' },
  { party: 'DA', candidate: 'Democratic Alliance', votes: '96', confidence: 94, tone: 'green' },
  { party: 'EFF', candidate: 'Economic Freedom Fighters', votes: '42', confidence: 88, tone: 'amber' },
  { party: 'IFP', candidate: 'Inkatha Freedom Party', votes: '18', confidence: 91, tone: 'green' },
  { party: 'MK', candidate: 'uMkhonto weSizwe', votes: '12', confidence: 72, tone: 'red' },
]

function Confidence({ value, tone }: { value: number; tone: string }) {
  return <span className={`confidence ${tone}`}><span className="confidence-dot" />{value}%</span>
}

export default function Home() {
  const [active, setActive] = useState('Review queue')
  const [approved, setApproved] = useState(false)
  const [showUpload, setShowUpload] = useState(false)

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark">R</div><div><strong>Result<span>Desk</span></strong><small>Election data capture</small></div></div>
        <div className="workspace-label">WORKSPACE <ChevronDown size={13} /></div>
        <div className="workspace">2024 National Election <span className="status-dot" /></div>
        <nav aria-label="Main navigation">
          {['Review queue', 'All results', 'Upload slips', 'Exports'].map((item, i) => <button key={item} className={`nav-item ${active === item ? 'active' : ''}`} onClick={() => item === 'Upload slips' ? setShowUpload(true) : setActive(item)}><span className="nav-icon">{i === 0 ? <FileText size={16}/> : i === 1 ? <Search size={16}/> : i === 2 ? <Upload size={16}/> : <MoreHorizontal size={16}/>}</span>{item}{i === 0 && <b>12</b>}</button>)}
        </nav>
        <div className="sidebar-bottom"><div className="secure"><ShieldCheck size={15}/> Secure workspace</div><div className="user"><div className="avatar">TN</div><div><strong>T. Ndlovu</strong><small>Reviewer</small></div><MoreHorizontal size={16}/></div></div>
      </aside>
      <section className="content">
        <header className="topbar"><div><p className="eyebrow">REVIEW QUEUE / RESULT 00482</p><h1>Result review</h1></div><div className="top-actions"><span className="sync"><span className="status-dot" />All changes saved</span><button className="icon-btn" aria-label="Notifications"><Flag size={17}/></button><button className="upload-btn" onClick={() => setShowUpload(true)}><Upload size={16}/> Upload slips</button></div></header>
        <div className="page-body">
          <div className="notice"><div className="notice-icon"><Link2 size={17}/></div><div><strong>Two pages linked to one result</strong><p>Reference <b>R-00482</b> · Ballot station 07 · Page 1 of 2 and Page 2 of 2</p></div><button className="link-btn">View link history</button></div>
          <div className="summary-grid"><div className="summary-card"><span>Review status</span><strong className={approved ? 'approved' : ''}>{approved ? 'Approved' : 'Needs review'}</strong><small>{approved ? 'Ready for export' : '3 fields need attention'}</small></div><div className="summary-card"><span>Extraction confidence</span><strong>91.4%</strong><small>Across 2 source pages</small></div><div className="summary-card"><span>Validation checks</span><strong>8 / 9 passed</strong><small className="warning-text">1 warning · total mismatch</small></div><div className="summary-card"><span>Last edited</span><strong>Today, 14:32</strong><small>By T. Ndlovu</small></div></div>
          <div className="workspace-head"><div><h2>Captured values</h2><p>Compare extracted data with the original source slip.</p></div><div className="view-actions"><button className="secondary-btn"><Filter size={15}/> Filter</button><button className="secondary-btn"><MoreHorizontal size={15}/></button></div></div>
          <div className="review-grid">
            <section className="table-panel"><div className="panel-toolbar"><div className="tabs"><button className="tab active">Vote table</button><button className="tab">Metadata</button><button className="tab">Audit trail</button></div><span className="row-count">5 rows</span></div><div className="table-wrap"><table><thead><tr><th>PARTY / CANDIDATE</th><th>VOTES</th><th>CONFIDENCE</th><th>STATUS</th></tr></thead><tbody>{rows.map(row => <tr key={row.party}><td><div className="party-cell"><span className="party-badge">{row.party}</span><span>{row.candidate}</span></div></td><td><input aria-label={`${row.party} votes`} defaultValue={row.votes}/></td><td><Confidence value={row.confidence} tone={row.tone}/></td><td>{row.tone === 'red' ? <span className="review-status"><Flag size={13}/> Review</span> : <span className="ok-status"><Check size={13}/> Verified</span>}</td></tr>)}</tbody></table></div><div className="table-footer"><span>Total valid votes</span><strong>352</strong><span className="mismatch">Expected total: 351 <Flag size={13}/></span></div></section>
            <section className="source-panel"><div className="source-head"><div><h3>Source slip</h3><p>R-00482 · Page 2 of 2</p></div><div className="source-tools"><button className="icon-btn"><ChevronDown size={16}/></button><button className="icon-btn"><MoreHorizontal size={16}/></button></div></div><div className="document"><div className="doc-paper"><div className="doc-top"><div className="doc-seal">IEC</div><div><strong>RESULT SLIP</strong><small>National Election · 2024</small></div><span>R-00482<br/><b>PAGE 2 / 2</b></span></div><div className="doc-rule"/><p className="doc-label">VOTING STATION RESULTS</p><div className="doc-line"><span>Station</span><b>07 — Mhlabeni Community Hall</b></div><div className="doc-line"><span>District</span><b>Ward 14 · KwaZulu-Natal</b></div><div className="doc-rule"/><div className="doc-table"><div className="doc-table-head"><span>PARTY</span><span>VOTES</span></div>{rows.map(r => <div className="doc-table-row" key={r.party}><span>{r.party}</span><span>{r.votes}</span></div>)}</div><div className="doc-total"><span>TOTAL VALID VOTES</span><b>352</b></div><div className="signature"><span>Presiding officer signature</span><span className="signature-mark">T. Mkhize</span></div></div></div><div className="source-footer"><span><Check size={14}/> Image quality good</span><button className="link-btn">Open original</button></div></section>
          </div>
          <div className="bottom-actions"><button className="reject-btn"><X size={16}/> Reject result</button><div><button className="save-btn">Save changes</button><button className="approve-btn" onClick={() => setApproved(true)}><Check size={16}/> Approve result</button></div></div>
        </div>
      </section>
      {showUpload && <div className="modal-backdrop" onClick={() => setShowUpload(false)}><div className="modal" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setShowUpload(false)}><X size={16}/></button><div className="upload-icon"><Upload size={20}/></div><h2>Upload result slips</h2><p>Drop scanned pages here or choose files from your device.</p><button className="upload-drop">Choose files</button><small>PNG, JPG or PDF · up to 25 MB each</small></div></div>}
    </main>
  )
}
