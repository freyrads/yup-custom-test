import "./App.css";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";

const schema = yup.object({
  keterangan: yup.string().test({
    name: "keterangan-test",
    message: "Keterangan is mandatory!",
    test: (val, ctx) => {
      console.log({ ctx });
      const checkboxVal = ctx.parent.checkbox;

      if (checkboxVal === "mandatory" && !val?.length) return false;

      return true;
    },
  }),
});

function App() {
  const [submitted, setSubmitted] = useState(false);

  const {
    reset,
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    watch,
    getFieldState,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      checkbox: "mandatory",
    },
  });

  const hasError = errors.keterangan?.message;

  return (
    <div className="App">
      <form onSubmit={handleSubmit(() => !submitted && setSubmitted(true))}>
        <input {...register("keterangan")} />
        <p>Keterangan value: '{watch("keterangan")}'</p>
        {hasError && <p className="error">{errors.keterangan.message}</p>}
        {!hasError && submitted && <p className="ok">OK</p>}

        <div>
          Checkbox value: {watch("checkbox")}
          <div className="checkbox-container">
            <label htmlFor="c1">Non Mandatory</label>
            <input
              id="c1"
              type="radio"
              value="non-mandatory"
              {...register("checkbox")}
            />
          </div>

          <div className="checkbox-container">
            <label htmlFor="c2">Mandatory</label>
            <input
              id="c2"
              type="radio"
              value="mandatory"
              {...register("checkbox")}
            />
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
