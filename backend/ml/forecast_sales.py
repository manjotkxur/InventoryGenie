
import pandas as pd
from prophet import Prophet

def forecast_sales(data: pd.DataFrame, periods: int = 7):
    """
    Forecast future sales using Facebook Prophet.

    Parameters:
    - data (pd.DataFrame): DataFrame with two columns: 'ds' (date) and 'y' (sales)
    - periods (int): Number of days to forecast into the future

    Returns:
    - forecast_df (pd.DataFrame): DataFrame with forecasted dates and values
    """

    if 'ds' not in data.columns or 'y' not in data.columns:
        raise ValueError("Data must have columns 'ds' (date) and 'y' (sales)")

    model = Prophet()
    model.fit(data)

    future = model.make_future_dataframe(periods=periods)
    
    forecast = model.predict(future)

    return forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail(periods)
