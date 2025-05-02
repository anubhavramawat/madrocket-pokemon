const SortSelect = ({ options, value, onChange }) => (
    <select value={value} onChange={onChange}>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  )
  
  export default SortSelect
  