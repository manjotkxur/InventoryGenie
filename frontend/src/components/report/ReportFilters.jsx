
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { Button, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import '../../css/report.css';

const ReportFilters = ({ filters, setFilters, onApply }) => {
  const [locationOptions, setLocationOptions] = useState([]);
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const locationSelectRef = useRef(null);
  const supplierSelectRef = useRef(null);
  const categorySelectRef = useRef(null);

  const { accesstoken } = useAuth();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${accesstoken}` } };
        const [locRes, suppRes, catRes] = await Promise.all([
          axios.get('http://localhost:5000/api/locations', config),
          axios.get('http://localhost:5000/api/suppliers', config),
          axios.get('http://localhost:5000/api/categories', config),
        ]);
        setLocationOptions(formatOptions(locRes.data));
        setSupplierOptions(formatOptions(suppRes.data));
        setCategoryOptions(formatOptions(catRes.data));
      } catch (err) {
        console.error('Error fetching filter options:', err);
      }
    };
    if (accesstoken) fetchOptions();
  }, [accesstoken]);

  const formatOptions = (items) =>
    items.map((item) => ({ value: item.id, label: item.name }));

  const addAllOption = (options) => [
    { value: 'ALL', label: 'All' },
    ...options,
  ];

  const handleChange = (selected, key, options, selectRef) => {
    const allSelected = selected?.some((opt) => opt.value === 'ALL');
    const fullValues = options.map((opt) => opt.value);

    if (allSelected) {
      setFilters((prev) => ({ ...prev, [key]: fullValues }));
      setTimeout(() => selectRef?.current?.blur(), 100);
    } else {
      const values = selected ? selected.map((opt) => opt.value) : [];
      setFilters((prev) => ({ ...prev, [key]: values }));
    }
  };

  const getDisplayValues = (key, options) => {
    const selected = filters[key] || [];
    const fullValues = options.map((opt) => opt.value);
    const isAllSelected = selected.length === fullValues.length;

    if (isAllSelected) {
      return [{ value: 'ALL', label: 'All' }];
    } else {
      return options
        .filter((opt) => selected.includes(opt.value))
        .map((opt) => ({ value: opt.value, label: opt.label }));
    }
  };

  const isAllSelected = (key, options) => {
    return filters[key]?.length === options.length;
  };

  return (
    <div className="report-filters">
      <Row className="mb-3">
        <Col md={4}>
          <label>Location</label>
          <Select
            isMulti
            ref={locationSelectRef}
            options={addAllOption(locationOptions)}
            value={getDisplayValues('location', locationOptions)}
            onChange={(selected) =>
              handleChange(selected, 'location', locationOptions, locationSelectRef)
            }
            isOptionDisabled={() => isAllSelected('location', locationOptions)}
            placeholder="Select locations..."
          />
        </Col>
        <Col md={4}>
          <label>Supplier</label>
          <Select
            isMulti
            ref={supplierSelectRef}
            options={addAllOption(supplierOptions)}
            value={getDisplayValues('supplier', supplierOptions)}
            onChange={(selected) =>
              handleChange(selected, 'supplier', supplierOptions, supplierSelectRef)
            }
            isOptionDisabled={() => isAllSelected('supplier', supplierOptions)}
            placeholder="Select suppliers..."
          />
        </Col>
        <Col md={4}>
          <label>Category</label>
          <Select
            isMulti
            ref={categorySelectRef}
            options={addAllOption(categoryOptions)}
            value={getDisplayValues('category', categoryOptions)}
            onChange={(selected) =>
              handleChange(selected, 'category', categoryOptions, categorySelectRef)
            }
            isOptionDisabled={() => isAllSelected('category', categoryOptions)}
            placeholder="Select categories..."
          />
        </Col>
      </Row>

      <div className="text-end">
        <Button variant="primary" onClick={onApply}>
          Generate Report
        </Button>
      </div>
    </div>
  );
};

export default ReportFilters;
