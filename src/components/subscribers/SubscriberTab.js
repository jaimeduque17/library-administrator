import React from 'react';

const SubscriberTab = ({ student }) => {
    return (
        <div className="card my-3">
            <h3 className="card-header bg-primary text-white">Applicant Information</h3>
            <div className="card-body">
                <p className="font-weight-bold">Name: {''}
                    <span className="font-weight-normal">{student.name}</span>
                </p>
                <p className="font-weight-bold">Code: {''}
                    <span className="font-weight-normal">{student.code}</span>
                </p>
                <p className="font-weight-bold">Career: {''}
                    <span className="font-weight-normal">{student.career}</span>
                </p>
            </div>
        </div>
    );
}

export default SubscriberTab;