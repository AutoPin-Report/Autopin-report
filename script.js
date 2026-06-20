const state = {
  floors: [],
  photos: [],
  selectedFloorId: '',
  reportType: 'Lux Report - Emergency',
  pendingPin: null,
  logoImage: '',
  zoom: 1
};
const $ = (id) => document.getElementById(id);
const els = {
  projectName: $('projectName'), projectDetails: $('projectDetails'), companyName: $('companyName'), companyAddress: $('companyAddress'), logoUpload: $('logoUpload'), logoPreview: $('logoPreview'), blockName: $('blockName'), floorName: $('floorName'), drawingUpload: $('drawingUpload'), addFloorBtn: $('addFloorBtn'), floorList: $('floorList'), floorSelect: $('floorSelect'), reportType: $('reportType'), drawingArea: $('drawingArea'), cameraInput: $('cameraInput'), photoList: $('photoList'), locationText: $('locationText'), commentText: $('commentText'), instruction: $('instruction'), pinModal: $('pinModal'), modalDetails: $('modalDetails'), openCamera: $('openCamera'), cancelPin: $('cancelPin'), generateBtn: $('generateBtn'), clearBtn: $('clearBtn'), floorCount: $('floorCount'), photoCount: $('photoCount'), quickFloors: $('quickFloors'), zoomIn: $('zoomIn'), zoomOut: $('zoomOut'), zoomReset: $('zoomReset'), zoomValue: $('zoomValue'), myProjectName: $('myProjectName'), myProjectSelect: $('myProjectSelect'), saveProgressBtn: $('saveProgressBtn'), continueLaterBtn: $('continueLaterBtn'), myProjectsGenerateBtn: $('myProjectsGenerateBtn'), deleteProjectBtn: $('deleteProjectBtn'), projectsStatus: $('projectsStatus'), downloadAllPhotosBtn: $('downloadAllPhotosBtn'), downloadFloorPhotosBtn: $('downloadFloorPhotosBtn')
};
function uid(){ return Math.random().toString(36).slice(2,9); }
function clean(s){ return (s || '').trim().replace(/[^a-z0-9]+/gi,'_').replace(/^_|_$/g,'') || 'Item'; }
function esc(s){ return String(s ?? '').replace(/[&<>\"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[ch])); }
function isMissing(v){ return !v || /^(Location_Not_Entered|Block_Not_Entered|Item)$/i.test(String(v).trim()); }
function displayLocation(v){ return isMissing(v) ? 'Not Specified' : String(v).trim(); }
function displayBlock(){ return isMissing(els.blockName.value) ? 'Not Specified' : els.blockName.value.trim(); }
function rebuildPhotoMetaForCode(code){
  const block = displayBlock();
  state.photos.filter(p => p.code === code).forEach(p => {
    const loc = displayLocation(p.location);
    p.label = `${p.photoNo || p.code} - ${loc} - ${block} - ${p.floorName} - ${p.reportType || p.mode || state.reportType}`;
  });
}

function dataUrlToBlob(dataUrl){
  const parts = dataUrl.split(',');
  const mime = (parts[0].match(/:(.*?);/) || [,'image/jpeg'])[1];
  const bin = atob(parts[1] || '');
  const len = bin.length;
  const arr = new Uint8Array(len);
  for(let i=0;i<len;i++) arr[i] = bin.charCodeAt(i);
  return new Blob([arr], {type:mime});
}
function imageExtension(dataUrl){
  const mime = (dataUrl.match(/^data:(.*?);/) || [,'image/jpeg'])[1].toLowerCase();
  if(mime.includes('png')) return 'png';
  if(mime.includes('webp')) return 'webp';
  return 'jpg';
}
function photoDownloadName(p){
  const ext = imageExtension(p.image);
  const pin = clean((p.photoNo || p.code || 'Pin').replace('.', '-'));
  const floor = clean(p.floorName || 'Floor');
  const loc = clean(displayLocation(p.location || p.note));
  const type = clean(p.reportType || p.mode || state.reportType || 'Report');
  return `${pin}_${floor}_${loc}_${type}.${ext}`;
}
function downloadBlob(blob, filename){
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(()=>URL.revokeObjectURL(url), 1200);
}
function downloadSinglePhoto(p){
  if(!p || !p.image) return;
  downloadBlob(dataUrlToBlob(p.image), photoDownloadName(p));
}
async function downloadPhotos(photos, scopeName){
  if(!photos.length){ alert('No photos available to download yet.'); return; }
  const project = clean(els.projectName.value || 'AutoPin_Project');
  const scope = clean(scopeName || 'Photos');
  if(window.JSZip){
    const zip = new JSZip();
    photos.forEach(p => zip.file(photoDownloadName(p), dataUrlToBlob(p.image)));
    const blob = await zip.generateAsync({type:'blob'});
    downloadBlob(blob, `${project}_${scope}_Photos.zip`);
  } else {
    photos.forEach((p, i) => setTimeout(()=>downloadSinglePhoto(p), i * 250));
    alert('ZIP export library is not loaded, so the photos will download one by one.');
  }
}

function readFile(file){ return new Promise((resolve,reject)=>{ const r=new FileReader(); r.onload=()=>resolve(r.result); r.onerror=reject; r.readAsDataURL(file); }); }
if(window.pdfjsLib){ pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'; }
async function pdfToImages(file){
  if(!window.pdfjsLib){ throw new Error('PDF support is not loaded. Please connect to the internet or upload JPG/PNG.'); }
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  const images = [];
  for(let pageNum = 1; pageNum <= pdf.numPages; pageNum++){
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: context, viewport }).promise;
    images.push({ pageNum, image: canvas.toDataURL('image/png') });
  }
  return images;
}
function makeFloorOptions(){
  const names = ['GF', ...Array.from({length:25}, (_,i)=>`Level ${String(i+1).padStart(2,'0')}`), 'Basement', 'Roof'];
  const select = document.getElementById('quickFloorSelect');
  const uploadBtn = document.getElementById('quickFloorUploadBtn');
  if(!select) return;
  select.innerHTML = '<option value="">Choose floor</option>' + names.map(n => `<option value="${n}">${n}</option>`).join('');
  select.addEventListener('change', () => {
    els.floorName.value = select.value;
  });
  if(uploadBtn){
    uploadBtn.addEventListener('click', () => {
      if(!select.value){ alert('Please choose a floor first.'); return; }
      els.floorName.value = select.value;
      els.drawingUpload.click();
    });
  }
}
const PROJECTS_KEY = 'autopin_report_saved_projects_v36';
const ACTIVE_DRAFT_KEY = 'autopin_report_active_draft_v36';

// Local browser saving: keeps an active draft on the same device/browser.
// This does not require login, database, or any app install.
let autoSaveTimer = null;
function save(){
  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(() => {
    try{
      localStorage.setItem(ACTIVE_DRAFT_KEY, JSON.stringify(exportProject()));
    }catch(e){
      // Browser storage can fill up with many large images; manual Save Progress will show errors.
    }
  }, 350);
}

function exportProject(){
  return {
    version: 'V25',
    savedAt: new Date().toLocaleString(),
    form: {
      projectName: els.projectName.value || '',
      projectDetails: els.projectDetails.value || '',
      companyName: els.companyName.value || '',
      companyAddress: els.companyAddress.value || '',
      blockName: els.blockName.value || ''
    },
    state: {
      floors: state.floors,
      photos: state.photos,
      selectedFloorId: state.selectedFloorId,
      reportType: state.reportType,
      logoImage: state.logoImage,
      zoom: state.zoom
    }
  };
}
function importProject(data){
  if(!data) return;
  const form = data.form || {};
  els.projectName.value = form.projectName || '';
  els.projectDetails.value = form.projectDetails || '';
  els.companyName.value = form.companyName || '';
  els.companyAddress.value = form.companyAddress || '';
  els.blockName.value = form.blockName || '';
  const s = data.state || {};
  state.floors = Array.isArray(s.floors) ? s.floors : [];
  state.photos = Array.isArray(s.photos) ? s.photos : [];
  state.selectedFloorId = s.selectedFloorId || state.floors[0]?.id || '';
  state.reportType = s.reportType || 'Lux Report - Emergency';
  state.pendingPin = null;
  state.logoImage = s.logoImage || '';
  state.zoom = s.zoom || 1;
  render();
}
function getSavedProjects(){
  try{ return JSON.parse(localStorage.getItem(PROJECTS_KEY) || '{}'); }
  catch(e){ return {}; }
}
function setSavedProjects(projects){
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}
function projectSaveName(){
  return (els.myProjectName?.value || els.projectName.value || 'Untitled Project').trim();
}
function renderProjectList(){
  if(!els.myProjectSelect) return;
  const projects = getSavedProjects();
  const names = Object.keys(projects).sort((a,b)=>(projects[b].savedAt || '').localeCompare(projects[a].savedAt || ''));
  els.myProjectSelect.innerHTML = '<option value="">Select saved project</option>' + names.map(name => `<option value="${esc(name)}">${esc(name)} - ${esc(projects[name].savedAt || '')}</option>`).join('');
}
function setProjectStatus(msg, ok=true){
  if(!els.projectsStatus) return;
  els.projectsStatus.textContent = msg;
  els.projectsStatus.style.color = ok ? '#2563eb' : '#b91c1c';
}
function saveCurrentProject(){
  const name = projectSaveName();
  if(!name){ alert('Please enter a project save name.'); return; }
  try{
    const projects = getSavedProjects();
    projects[name] = exportProject();
    setSavedProjects(projects);
    if(els.myProjectName) els.myProjectName.value = name;
    renderProjectList();
showPage('home');
    if(els.myProjectSelect) els.myProjectSelect.value = name;
    setProjectStatus(`Saved: ${name}`);
  }catch(e){
    alert('Save failed. This browser may not have enough local storage for all photos/drawings. Try reducing photos or use the future cloud version.');
    setProjectStatus('Save failed. Browser storage may be full.', false);
  }
}
function continueSavedProject(){
  const name = els.myProjectSelect?.value;
  let project = name ? getSavedProjects()[name] : null;
  if(!project && !name){
    try{ project = JSON.parse(localStorage.getItem(ACTIVE_DRAFT_KEY) || 'null'); }catch(e){ project = null; }
    if(!project){ alert('Please select a saved project first.'); return; }
    importProject(project);
    if(els.myProjectName) els.myProjectName.value = projectSaveName();
    setProjectStatus('Loaded last browser draft');
    showPage('workspace');
    return;
  }
  if(!project){ alert('Saved project not found.'); renderProjectList(); return; }
  importProject(project);
  if(els.myProjectName) els.myProjectName.value = name;
  setProjectStatus(`Loaded: ${name}`);
  showPage('workspace');
}
function deleteSavedProject(){
  const name = els.myProjectSelect?.value;
  if(!name){ alert('Please select a saved project to delete.'); return; }
  if(!confirm(`Delete saved project "${name}"? This removes it from this browser only.`)) return;
  const projects = getSavedProjects();
  delete projects[name];
  setSavedProjects(projects);
  renderProjectList();
  setProjectStatus(`Deleted saved project: ${name}`);
}
function load(){
  try{
    ['autopin_pdf_demo_v13','autopin_pdf_demo_v12','autopin_pdf_demo_v11','autopin_pdf_demo','autopin_demo'].forEach(k => localStorage.removeItem(k));
    sessionStorage.clear();
  }catch(e){}
  renderProjectList();
}
function floor(){ return state.floors.find(f=>f.id===state.selectedFloorId); }

els.addFloorBtn.addEventListener('click', addFloor);
els.logoUpload.addEventListener('change', async () => {
  const file = els.logoUpload.files[0];
  if(!file) return;
  state.logoImage = await readFile(file);
  save(); renderLogo();
});
els.drawingUpload.addEventListener('change', () => { if(els.floorName.value.trim() && els.drawingUpload.files[0]) addFloor(); });
els.floorSelect.addEventListener('change', () => { state.selectedFloorId = els.floorSelect.value; save(); render(); });
els.reportType.addEventListener('change', () => { state.reportType = els.reportType.value; els.instruction.textContent = `${state.reportType} selected. Tap the drawing where you want to pin the photo.`; save(); render(); });
els.drawingArea.addEventListener('click', onDrawingClick);
els.cancelPin.addEventListener('click', () => { state.pendingPin = null; els.pinModal.classList.add('hidden'); });
els.openCamera.addEventListener('click', () => { els.pinModal.classList.add('hidden'); els.cameraInput.click(); });
els.cameraInput.addEventListener('change', onPhotoSelected);
els.generateBtn.addEventListener('click', generateReport);
if(els.saveProgressBtn) els.saveProgressBtn.addEventListener('click', saveCurrentProject);
if(els.continueLaterBtn) els.continueLaterBtn.addEventListener('click', continueSavedProject);
if(els.deleteProjectBtn) els.deleteProjectBtn.addEventListener('click', deleteSavedProject);
if(els.myProjectsGenerateBtn) els.myProjectsGenerateBtn.addEventListener('click', generateReport);
if(els.myProjectSelect) els.myProjectSelect.addEventListener('change', () => {
  if(els.myProjectName && els.myProjectSelect.value) els.myProjectName.value = els.myProjectSelect.value;
});
els.downloadAllPhotosBtn.addEventListener('click', () => downloadPhotos(state.photos, 'All'));
els.downloadFloorPhotosBtn.addEventListener('click', () => {
  const f = currentFloor();
  const floorPhotos = f ? state.photos.filter(p => p.floorId === f.id) : [];
  downloadPhotos(floorPhotos, f ? f.name : 'Selected_Floor');
});

els.clearBtn.addEventListener('click', () => {
  if(confirm('Clear current working area? Saved projects will not be deleted.')){
    state.floors=[]; state.photos=[]; state.selectedFloorId=''; state.reportType='Lux Report - Emergency'; state.pendingPin=null; state.zoom=1; state.logoImage='';
    render();
  }
});
els.zoomIn.addEventListener('click', () => { state.zoom = Math.min(2.5, +(state.zoom + 0.1).toFixed(2)); save(); renderDrawing(); });
els.zoomOut.addEventListener('click', () => { state.zoom = Math.max(0.5, +(state.zoom - 0.1).toFixed(2)); save(); renderDrawing(); });
els.zoomReset.addEventListener('click', () => { state.zoom = 1; save(); renderDrawing(); });

async function addFloor(){
  const baseName = els.floorName.value.trim();
  const file = els.drawingUpload.files[0];
  if(!baseName || !file){ alert('Please enter floor name and choose a drawing PDF, JPG or PNG.'); return; }
  try{
    els.addFloorBtn.disabled = true;
    els.addFloorBtn.textContent = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf') ? 'Converting PDF...' : 'Adding drawing...';
    if(file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')){
      const pages = await pdfToImages(file);
      pages.forEach(page => {
        const name = pages.length > 1 ? `${baseName} - Page ${String(page.pageNum).padStart(2,'0')}` : baseName;
        state.floors.push({ id: uid(), name, image: page.image, sourceType: 'PDF', sourceFile: file.name, pageNum: page.pageNum, uploaded: new Date().toLocaleString() });
      });
      state.selectedFloorId = state.floors[state.floors.length - pages.length]?.id || state.floors[state.floors.length - 1]?.id || '';
    } else {
      const image = await readFile(file);
      const newFloor = { id: uid(), name: baseName, image, sourceType: 'Image', sourceFile: file.name, uploaded: new Date().toLocaleString() };
      state.floors.push(newFloor);
      state.selectedFloorId = newFloor.id;
    }
    els.floorName.value = '';
    els.drawingUpload.value = '';
    save(); render();
  }catch(err){
    alert(err.message || 'Could not add this drawing. Please try JPG/PNG or another PDF.');
  }finally{
    els.addFloorBtn.disabled = false;
    els.addFloorBtn.textContent = 'Add drawing / PDF';
  }
}

function onDrawingClick(e){
  const f = floor();
  if(!f){ alert('Choose a floor first.'); return; }
  const markerEl = e.target.closest && e.target.closest('.marker');
  if(markerEl){
    const code = markerEl.dataset.code;
    const existing = state.photos.find(p => p.code === code && p.floorId === f.id);
    if(existing){ editPinLocation(existing); }
    return;
  }
  const canvas = els.drawingArea.querySelector('.drawingCanvas');
  if(!canvas) return;
  const rect = canvas.getBoundingClientRect();
  if(e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) return;
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  const nextCode = getNextCode(state.reportType);
  state.pendingPin = { floorId:f.id, floorName:f.name, x, y, reportType:state.reportType, location:els.locationText.value.trim(), comment:els.commentText.value.trim(), existingCode:null };
  els.modalDetails.textContent = `${f.name} • ${state.reportType} • ${nextCode}. Camera/photo chooser will open next.`;
  els.pinModal.classList.remove('hidden');
}
function openExistingPin(existing){
  state.pendingPin = { floorId: existing.floorId, floorName: existing.floorName, x: existing.x, y: existing.y, reportType: existing.reportType || existing.mode, location: existing.location || '', comment: existing.comment || '', existingCode: existing.code };
  els.modalDetails.textContent = `${existing.floorName} • Add another photo to ${existing.code}. Camera/photo chooser will open next.`;
  els.pinModal.classList.remove('hidden');
}
function editPin(existing){
  const currentLocation = isMissing(existing.location) ? '' : existing.location;
  const newLocation = prompt(`Edit location for ${existing.code}`, currentLocation);
  if(newLocation === null) return;
  const currentComment = existing.comment || '';
  const newComment = prompt(`Edit comment for ${existing.code}`, currentComment);
  if(newComment === null) return;
  state.photos.filter(x => x.code === existing.code && x.floorId === existing.floorId).forEach(x => {
    x.location = newLocation.trim() || 'Location_Not_Entered';
    x.comment = newComment.trim();
  });
  rebuildPhotoMetaForCode(existing.code);
  save(); render();
}

function editPinLocation(existing){
  const currentLocation = isMissing(existing.location) ? '' : existing.location;
  const newLocation = prompt(`Add / edit location for ${existing.code}`, currentLocation);
  if(newLocation === null) return;
  state.photos.filter(x => x.code === existing.code && x.floorId === existing.floorId).forEach(x => {
    x.location = newLocation.trim() || 'Location_Not_Entered';
  });
  rebuildPhotoMetaForCode(existing.code);
  save(); render();
}

function editPinComment(existing){
  const currentComment = existing.comment || '';
  const newComment = prompt(`Add / edit comment for ${existing.code}`, currentComment);
  if(newComment === null) return;
  state.photos.filter(x => x.code === existing.code && x.floorId === existing.floorId).forEach(x => {
    x.comment = newComment.trim();
  });
  save(); render();
}
function deletePin(existing){
  const related = state.photos.filter(x => x.code === existing.code && x.floorId === existing.floorId);
  const msg = `Delete pin ${existing.code}?\n\nThis will remove ${related.length} attached photo${related.length===1?'':'s'} and any comments for this pin.`;
  if(!confirm(msg)) return;
  state.photos = state.photos.filter(x => !(x.code === existing.code && x.floorId === existing.floorId));
  save(); render();
}
function openPinActions(existing){
  editPinLocation(existing);
}


function prefixFor(type){
  const map = {
    'Lux Report - Emergency': 'E',
    'Lux Report - Normal': 'N',
    'Site Report': 'SR',
    'Inspection Report': 'IR',
    'Snag Report': 'S',
    'Wall Closure Report': 'WC',
    'QA Report': 'QA',
    'Custom Report': 'C'
  };
  return map[type] || 'P';
}
function uniqueCodesFor(type){ return [...new Set(state.photos.filter(p => (p.reportType || p.mode) === type).map(p => p.code))]; }

// V24 numbering fix:
// Do not reuse deleted pin numbers. If E-001 is deleted while E-002 exists,
// the next new pin should become E-003, not E-002 again.
// This prevents new pins accidentally merging with the last existing pin.
function getNextCode(type){
  const prefix = prefixFor(type);
  const numbers = uniqueCodesFor(type)
    .map(code => {
      const match = String(code || '').match(new RegExp('^' + prefix.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&') + '-(\\d+)$'));
      return match ? parseInt(match[1], 10) : 0;
    })
    .filter(n => Number.isFinite(n));
  const next = (numbers.length ? Math.max(...numbers) : 0) + 1;
  return `${prefix}-${String(next).padStart(3,'0')}`;
}
function getPinPhotoSeq(code){ return state.photos.filter(p => p.code === code).length + 1; }

async function onPhotoSelected(){
  if(!state.pendingPin || !els.cameraInput.files[0]) return;
  const p = state.pendingPin;
  const image = await readFile(els.cameraInput.files[0]);
  const code = p.existingCode || getNextCode(p.reportType);
  const photoSeq = getPinPhotoSeq(code);
  const photoNo = `${code}.${String(photoSeq).padStart(2,'0')}`;
  const location = p.location || 'Location_Not_Entered';
  const comment = p.comment || '';
  const block = els.blockName.value || 'Block_Not_Entered';
  const label = `${photoNo} - ${displayLocation(location)} - ${displayBlock()} - ${p.floorName} - ${p.reportType}`;
  const filename = `${photoNo.replace('.','_')}_${clean(displayLocation(location))}_${clean(displayBlock())}_${clean(p.floorName)}.jpg`;
  state.photos.push({ ...p, id: uid(), code, photoNo, photoSeq, image, filename, label, location, comment, created: new Date().toLocaleString() });
  els.cameraInput.value = '';
  els.locationText.value = '';
  els.commentText.value = '';
  state.pendingPin = null;
  save(); render();
}

function render(){
  renderLogo(); renderFloors(); renderDrawing(); renderPhotos();
  if(els.reportType) els.reportType.value = state.reportType || 'Lux Report - Emergency';
  els.floorCount.textContent = state.floors.length;
  els.photoCount.textContent = state.photos.length;
  els.zoomValue.textContent = Math.round((state.zoom || 1) * 100) + '%';
}
function renderLogo(){
  if(state.logoImage){
    els.logoPreview.innerHTML = `<img src="${state.logoImage}" alt="Company logo preview"><span>Logo uploaded for PDF report.</span>`;
  } else {
    els.logoPreview.textContent = 'No logo uploaded yet.';
  }
}
function renderFloors(){
  els.floorList.innerHTML = state.floors.length ? state.floors.map(f => `<div class="floorItem ${f.id===state.selectedFloorId?'active':''}" data-id="${f.id}"><span>📐 ${f.name}${f.sourceType === 'PDF' ? ' <em class="sourcePill">PDF</em>' : ''}</span><button title="Remove floor" data-remove="${f.id}">×</button></div>`).join('') : '<p class="muted">No floors uploaded yet.</p>';
  els.floorList.querySelectorAll('.floorItem span').forEach(span => span.addEventListener('click', (e)=>{ state.selectedFloorId = e.target.closest('.floorItem').dataset.id; save(); render(); }));
  els.floorList.querySelectorAll('[data-remove]').forEach(btn => btn.addEventListener('click', (e)=>{ const id=e.target.dataset.remove; if(confirm('Remove this floor and its photos?')){ state.floors=state.floors.filter(f=>f.id!==id); state.photos=state.photos.filter(p=>p.floorId!==id); if(state.selectedFloorId===id) state.selectedFloorId=state.floors[0]?.id||''; save(); render(); } }));
  els.floorSelect.innerHTML = '<option value="">Choose floor</option>' + state.floors.map(f => `<option value="${f.id}">${f.name}</option>`).join('');
  els.floorSelect.value = state.selectedFloorId;
}
function renderDrawing(){
  const f = floor();
  els.zoomValue.textContent = Math.round((state.zoom || 1) * 100) + '%';
  if(!f){ els.drawingArea.innerHTML = '<div class="emptyState">Upload drawings and choose a floor to start pinning.</div>'; return; }
  els.instruction.textContent = `Current floor: ${f.name}. Tap a new location to add a photo. Tap an existing marker to add/edit its location.`;
  const widthPct = Math.round((state.zoom || 1) * 100);
  els.drawingArea.innerHTML = `<div class="drawingCanvas" style="width:${widthPct}%;"><img src="${f.image}" alt="${esc(f.name)} drawing"></div>`;
  const canvas = els.drawingArea.querySelector('.drawingCanvas');
  const pinMap = new Map();
  state.photos.filter(p => p.floorId === f.id).forEach(p => { if(!pinMap.has(p.code)) pinMap.set(p.code, p); });
  pinMap.forEach(p => {
    const marker = document.createElement('div');
    const count = state.photos.filter(x => x.code === p.code && x.floorId === f.id).length;
    marker.className = 'marker ' + markerClass(p.reportType || p.mode);
    marker.style.left = p.x + '%'; marker.style.top = p.y + '%'; marker.dataset.code = p.code;
    marker.innerHTML = `${p.code}${count > 1 ? `<small>${count}</small>` : ''}`;
    marker.title = `${p.code} • ${count} photo${count > 1 ? 's' : ''}. Click to add/edit location.`;
    marker.addEventListener('contextmenu',(e)=>{e.preventDefault(); editPinLocation(p);});
    canvas.appendChild(marker);
  });
}
function renderPhotos(){
  const list = state.selectedFloorId ? state.photos.filter(p => p.floorId === state.selectedFloorId) : state.photos;
  els.photoList.innerHTML = list.length ? list.map(p => `<div class="photoCard"><img src="${p.image}" alt="${esc(p.photoNo || p.code)}"><div><b>${esc((p.photoNo || p.code) + ' - ' + displayLocation(p.location) + ' - ' + displayBlock() + ' - ' + p.floorName)}</b><small>${esc(p.reportType || p.mode)} • ${esc(p.created)}</small>${p.comment ? `<small><b>Note:</b> ${esc(p.comment)}</small>` : ''}<div class="pinBtns"><button class="miniAdd" data-addpin="${esc(p.code)}">+ Add photo</button><button class="miniAdd" data-commentpin="${esc(p.code)}">Comment</button><button class="miniAdd" data-downloadphoto="${esc(p.id)}">Download</button><button class="miniDelete" data-delpin="${esc(p.code)}">Delete</button></div></div></div>`).join('') : '<p class="muted">No photos for this floor yet.</p>';
  els.photoList.querySelectorAll('[data-addpin]').forEach(btn => btn.addEventListener('click', (e)=>{ const code = e.currentTarget.dataset.addpin; const p = state.photos.find(x => x.code === code); if(p) openExistingPin(p); }));
  els.photoList.querySelectorAll('[data-commentpin]').forEach(btn => btn.addEventListener('click', (e)=>{ const code = e.currentTarget.dataset.commentpin; const p = state.photos.find(x => x.code === code); if(p) editPinComment(p); }));
  els.photoList.querySelectorAll('[data-downloadphoto]').forEach(btn => btn.addEventListener('click', (e)=>{ const id = e.currentTarget.dataset.downloadphoto; const p = state.photos.find(x => x.id === id); if(p) downloadSinglePhoto(p); }));
  els.photoList.querySelectorAll('[data-delpin]').forEach(btn => btn.addEventListener('click', (e)=>{ const code = e.currentTarget.dataset.delpin; const p = state.photos.find(x => x.code === code); if(p) deletePin(p); }));
}
function markerClass(type){
  if(type === 'Lux Report - Normal' || type === 'Inspection Report') return 'normal';
  if(type === 'Site Report' || type === 'QA Report') return 'site';
  if(type === 'Snag Report') return 'snag';
  if(type === 'Wall Closure Report') return 'wall';
  return '';
}
function markerColor(type){
  if(type === 'Lux Report - Normal') return '#f59e0b';
  if(type === 'Site Report' || type === 'Inspection Report' || type === 'QA Report' || type === 'Custom Report') return '#10b981';
  if(type === 'Snag Report') return '#ef4444';
  if(type === 'Wall Closure Report') return '#8b5cf6';
  return '#2563eb';
}
function reportPinSvg(code, type){
  const fill = markerColor(type);
  const safeCode = esc(code);
  return `<svg class="pinSvg" viewBox="0 0 64 78" xmlns="http://www.w3.org/2000/svg" aria-label="${safeCode}">
    <defs><filter id="pinShadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="5" stdDeviation="4" flood-color="${fill}" flood-opacity="0.35"/></filter></defs>
    <path d="M32 76 C32 76 8 48 8 27 C8 13.7 18.7 3 32 3 C45.3 3 56 13.7 56 27 C56 48 32 76 32 76 Z" fill="${fill}" stroke="#ffffff" stroke-width="5" filter="url(#pinShadow)"/>
    <text x="32" y="30" text-anchor="middle" dominant-baseline="middle" font-family="Inter,Arial,sans-serif" font-size="12" font-weight="800" fill="#ffffff">${safeCode}</text>
  </svg>`;
}

function generateReport(){
  if(!state.photos.length){ alert('Add photos first.'); return; }
  const missing = state.photos.filter(p => isMissing(p.location)).map(p => `${p.code}: location missing`);
  if(missing.length){
    const proceed = confirm(`Missing Information Found\n\n${missing.slice(0,12).join('\n')}${missing.length>12?'\n...':''}\n\nContinue generating report anyway?`);
    if(!proceed) return;
  }
  const project = esc(els.projectName.value || 'Project');
  const block = esc(displayBlock());
  const projectDetails = esc(els.projectDetails.value || '');
  const companyName = esc(els.companyName.value || '');
  const companyAddress = esc(els.companyAddress.value || '');
  const logoHtml = state.logoImage ? `<img class="reportLogo" src="${state.logoImage}" alt="Company logo">` : '';
  let html = `<!doctype html><html><head><title>AutoPin Report</title><style>
    *{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}body{font-family:Inter,Arial,sans-serif;color:#0f172a;margin:0;padding:28px;background:#fff}button{background:#2563eb;color:#fff;border:0;border-radius:8px;padding:12px 16px;font-weight:bold}h1{color:#003b95;margin-bottom:5px}.cover{border-bottom:3px solid #2563eb;padding-bottom:20px;margin-bottom:20px;display:flex;gap:18px;align-items:flex-start}.reportLogo{max-width:130px;max-height:90px;object-fit:contain;border:1px solid #dbe7f7;border-radius:10px;padding:8px}.meta{color:#475569;line-height:1.55}.floor{page-break-before:always}.drawingWrap{position:relative;display:inline-block;max-width:100%;border:1px solid #dbe7f7}.drawingWrap img{max-width:100%;display:block}.reportMarker{position:absolute;left:0;top:0;width:3.2%;min-width:22px;max-width:36px;transform:translate(-50%,-92%);z-index:5}.reportMarker svg{width:100%;height:auto;display:block;overflow:visible}.labelTable{border-collapse:collapse;width:100%;margin-top:14px;font-size:12px}.labelTable th,.labelTable td{border:1px solid #dbe7f7;padding:8px;text-align:left;vertical-align:top}.labelTable th{background:#eff6ff;color:#003b95}.photoEvidence{page-break-before:always}.photoEvidence h2{color:#003b95;border-bottom:2px solid #2563eb;padding-bottom:8px;margin-bottom:10px}.photoGrid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-top:16px}.photo{border:1px solid #dbe7f7;border-radius:10px;padding:10px;break-inside:avoid}.photoImageWrap{position:relative;border-radius:8px;overflow:hidden;background:#f8fafc}.photo img{width:100%;height:auto;max-height:none;object-fit:contain;border-radius:8px;display:block;background:#f8fafc}.small{font-size:12px;color:#64748b;word-break:break-word;line-height:1.45}.photoTitle{font-weight:bold;color:#003b95;margin:8px 0 4px}.noteBox{margin-top:8px;background:#f8fafc;border-left:3px solid #2563eb;padding:8px;border-radius:8px;color:#475569;font-size:12px}@media print{button{display:none}.floor{page-break-before:always}.photoEvidence{page-break-before:always}.photo{break-inside:avoid}.drawingWrap{max-width:100%}.reportMarker{width:3.0%;min-width:18px;max-width:30px}}
  </style></head><body><button onclick="window.print()">Print / Save as PDF</button><section class="cover">${logoHtml}<div><h1>AutoPin Report - Photo Evidence Report</h1><p class="meta"><b>Company:</b> ${companyName || 'N/A'}<br><b>Address:</b> ${companyAddress || 'N/A'}<br><b>Project:</b> ${project}<br><b>Project Details:</b> ${projectDetails || 'N/A'}<br><b>Block:</b> ${block}<br><b>Total Floors:</b> ${state.floors.length}<br><b>Total Photos:</b> ${state.photos.length}<br><b>Generated:</b> ${new Date().toLocaleString()}</p></div></section>`;
  state.floors.forEach(f => {
    const ps = state.photos.filter(p => p.floorId === f.id);
    if(!ps.length) return;
    const pinMap = new Map();
    ps.forEach(p => { if(!pinMap.has(p.code)) pinMap.set(p.code, p); });
    html += `<section class="floor"><h2>${esc(f.name)} - Marked Drawing</h2><div class="drawingWrap"><img src="${f.image}">`;
    pinMap.forEach(p => html += `<span class="reportMarker" style="left:${p.x}%;top:${p.y}%">${reportPinSvg(p.code, p.reportType || p.mode)}</span>`);
    html += `</div><table class="labelTable"><thead><tr><th>Photo No</th><th>Pin</th><th>Location</th><th>Block</th><th>Floor</th><th>Report Type</th><th>Comment</th></tr></thead><tbody>`;
    ps.forEach(p => html += `<tr><td>${esc(p.photoNo || p.code)}</td><td>${esc(p.code)}</td><td>${esc(displayLocation(p.location || p.note))}</td><td>${block}</td><td>${esc(p.floorName)}</td><td>${esc(p.reportType || p.mode)}</td><td>${esc(p.comment || '')}</td></tr>`);
    html += `</tbody></table></section><section class="photoEvidence"><h2>${esc(f.name)} - Photo Evidence</h2><p class="small"><b>Project:</b> ${project} &nbsp; | &nbsp; <b>Block:</b> ${block} &nbsp; | &nbsp; <b>Floor:</b> ${esc(f.name)}</p><div class="photoGrid">`;
    ps.forEach(p => { const locText = esc(displayLocation(p.location || p.note)); const photoTitle = `${esc(p.photoNo || p.code)} - ${locText} - ${block} - ${esc(p.floorName)}`; html += `<div class="photo"><div class="photoImageWrap"><img src="${p.image}"></div><div class="photoTitle">${photoTitle}</div><p class="small"><b>Pin:</b> ${esc(p.code)}<br><b>Location:</b> ${locText}<br><b>Block:</b> ${block}<br><b>Floor:</b> ${esc(p.floorName)}<br><b>Report Type:</b> ${esc(p.reportType || p.mode)}<br><b>Captured:</b> ${esc(p.created)}</p>${p.comment ? `<div class="noteBox"><b>Comment:</b> ${esc(p.comment)}</div>` : ''}</div>`; });
    html += `</div></section>`;
  });
  html += '</body></html>';
  const w = window.open('', '_blank');
  if(!w){ alert('Popup blocked. Please allow popups for this file/site and try again.'); return; }
  w.document.write(html); w.document.close();
}


// V30 Premium navigation: Home is marketing; Start Project opens workspace
function showPage(page){
  const isWorkspace = page === 'workspace';
  const navPage = isWorkspace ? '' : page;
  document.querySelectorAll('.navTab').forEach(btn => btn.classList.toggle('active', btn.dataset.page === navPage));
  document.querySelectorAll('.pageView').forEach(sec => sec.classList.remove('activePage'));
  document.querySelectorAll('.homeOnly').forEach(sec => { sec.style.display = 'none'; });

  const app = document.getElementById('app');
  if(app){
    app.classList.toggle('workspaceHidden', !isWorkspace);
    app.classList.toggle('workspaceVisible', isWorkspace);
  }

  const map = {home:'homePage', projects:'projectsPage', how:'howPage', pricing:'pricingPage', privacy:'privacyPage', terms:'termsPage'};
  if(isWorkspace){
    window.scrollTo({top:0, behavior:'auto'});
    return;
  }
  const el = document.getElementById(map[page]);
  if(el) el.classList.add('activePage');
  window.scrollTo({top:0, behavior:'auto'});
}
document.querySelectorAll('.navTab').forEach(btn => btn.addEventListener('click', () => showPage(btn.dataset.page)));
document.querySelectorAll('.footerLink').forEach(btn => btn.addEventListener('click', () => showPage(btn.dataset.page))); 
document.querySelectorAll('.startProjectBtn').forEach(btn => btn.addEventListener('click', () => showPage('workspace')));
document.querySelectorAll('.loginBtn').forEach(btn => btn.addEventListener('click', () => alert('Login, Google registration and team sharing will be added together in the cloud version.')));

window.addEventListener('beforeunload', () => { try{ localStorage.setItem(ACTIVE_DRAFT_KEY, JSON.stringify(exportProject())); }catch(e){} });
makeFloorOptions();
load();
render();
renderProjectList();
