import React from 'react';
import type { Moment } from 'moment';
import moment from 'moment';
import Picker from '../../src/Picker';
import momentGenerateConfig from '../../src/generate/moment';
import enUS from '../../src/locale/en_US';
import '../../assets/index.less';

// const defaultValue = moment('2019-09-03 05:02:03');
const defaultValue = moment('2019-11-28 01:02:03');

export default () => {
  const [value, setValue] = React.useState<Moment | null>(defaultValue);
  const pickerRef = React.useRef(null)

  const onSelect = (newValue: Moment) => {
    console.log('Select:', newValue);
  };

  const onChange = (newValue: Moment | null) => {
    console.log('ref', pickerRef)
    setValue(newValue);
  };

  const sharedProps = {
    generateConfig: momentGenerateConfig,
    value,
    onSelect,
    onChange,
  };

  return (
    <div>
      <h1>Value: {value ? value.format('YYYY-MM-DD HH:mm:ss') : 'null'}</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ margin: '0 8px' }}>
          <h3>Basic</h3>
          <Picker<Moment> ref={pickerRef} {...sharedProps} locale={enUS} onChange={() => console.log(pickerRef)} />
        </div>
      </div>
    </div>
  );
};
