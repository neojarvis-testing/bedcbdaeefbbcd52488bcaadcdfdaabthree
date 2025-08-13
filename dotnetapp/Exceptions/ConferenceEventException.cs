using System;

namespace dotnetapp.Exceptions
{
    public class ConferenceEventException : Exception
    {
        public ConferenceEventException(string message) : base(message)
        {
        }
    }
}